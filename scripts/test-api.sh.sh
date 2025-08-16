#!/usr/bin/env bash

set -euo pipefail

# Default test file
TEST_FILE="${1:-$(dirname "$0")/api-tests.json}"

if [[ ! -f "$TEST_FILE" ]]; then
    echo "❌ Error: Test file '$TEST_FILE' not found" >&2
    echo "Usage: $0 [test-file.json]" >&2
    exit 1
fi

# Check dependencies
for cmd in curl jq; do
    if ! command -v "$cmd" >/dev/null 2>&1; then
        echo "❌ Error: required command '$cmd' not found. Please install it and re-run." >&2
        exit 1
    fi
done

echo "🚀 Running API tests from: $TEST_FILE"

# Read base URL
BASE_URL=$(jq -r '.baseUrl' "$TEST_FILE")
echo "📍 Base URL: $BASE_URL"
echo

# Get test count
TEST_COUNT=$(jq '.tests | length' "$TEST_FILE")
PASSED=0
FAILED=0

# Run each test
for ((i=0; i<TEST_COUNT; i++)); do
    test_name=$(jq -r ".tests[$i].name" "$TEST_FILE")
    method=$(jq -r ".tests[$i].method" "$TEST_FILE")
    path=$(jq -r ".tests[$i].path" "$TEST_FILE")
    expect_code=$(jq -r ".tests[$i].expectCode" "$TEST_FILE")
    
    echo "🧪 Test $((i+1))/$TEST_COUNT: $test_name"
    
    # Build URL
    url="${BASE_URL}${path}"
    
    # Prepare request
    tmp=$(mktemp)
    
    # Check if there's a request body
    if jq -e ".tests[$i].body" "$TEST_FILE" >/dev/null; then
        body=$(jq -c ".tests[$i].body" "$TEST_FILE")
        # Simple variable replacement for uniqueness
        timestamp=$(date +%s)
        body="${body//TIMESTAMP/$timestamp}"
        http_code=$(curl -sS -o "$tmp" -w "%{http_code}" -X "$method" "$url" \
            -H "Content-Type: application/json" \
            -d "$body")
    else
        http_code=$(curl -sS -o "$tmp" -w "%{http_code}" -X "$method" "$url")
    fi
    
    echo "   📡 $method $path → HTTP $http_code"
    
    # Check status code
    if [[ "$http_code" != "$expect_code" ]]; then
        echo "   ❌ FAIL: Expected HTTP $expect_code, got $http_code"
        echo "   Response:"
        cat "$tmp" | jq . 2>/dev/null || cat "$tmp"
        FAILED=$((FAILED + 1))
        rm -f "$tmp"
        echo
        continue
    fi
    
    # Check response structure if specified
    if jq -e ".tests[$i].expectResponse" "$TEST_FILE" >/dev/null; then
        actual=$(cat "$tmp")
        
        # Check each expected field
        all_match=true
        while IFS='=' read -r key expected_value; do
            if [[ -n "$key" && -n "$expected_value" ]]; then
                # Remove quotes from expected value if it's a string
                expected_value=$(echo "$expected_value" | sed 's/^"//;s/"$//')
                
                # Get actual value using jq
                actual_value=$(echo "$actual" | jq -r ".$key" 2>/dev/null)
                
                if [[ "$actual_value" != "$expected_value" ]]; then
                    echo "   ❌ FAIL: Field '$key' expected '$expected_value', got '$actual_value'"
                    all_match=false
                fi
            fi
        done < <(jq -r ".tests[$i].expectResponse | to_entries[] | \"\(.key)=\(.value)\"" "$TEST_FILE")
        
        if [[ "$all_match" == "true" ]]; then
            echo "   ✅ PASS: Response structure matches"
        else
            FAILED=$((FAILED + 1))
            rm -f "$tmp"
            echo
            continue
        fi
    else
        echo "   ✅ PASS: HTTP status code matches"
    fi
    
    PASSED=$((PASSED + 1))
    rm -f "$tmp"
    echo
done

# Summary
echo "📊 Test Results:"
echo "   ✅ Passed: $PASSED"
echo "   ❌ Failed: $FAILED"
echo "   📈 Total: $((PASSED + FAILED))"

if [[ $FAILED -eq 0 ]]; then
    echo
    echo "🎉 All tests passed!"
    exit 0
else
    echo
    echo "💥 Some tests failed!"
    exit 1
fi