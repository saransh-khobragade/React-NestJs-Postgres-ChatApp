#!/usr/bin/env bash
set -euo pipefail

# Simple rebuild helper with two modes: soft and hard
#
# Quick guidance:
# - For config/env updates: run SOFT (no image build)
#     scripts/rebuild.sh backend soft
# - For code/Dockerfile changes: run HARD (rebuild image)
#     scripts/rebuild.sh backend hard
#
# Usage:
#   scripts/rebuild.sh <service|all> <soft|hard>

print_help() {
  cat <<'EOF'
Usage: scripts/rebuild.sh <service|all> <soft|hard>

What should I use?
  - Config/ENV updates → SOFT (recreate container, no build)
      scripts/rebuild.sh backend soft
  - Code/Dockerfile changes → HARD (rebuild image, then up)
      scripts/rebuild.sh backend hard

Examples:
  scripts/rebuild.sh tempo soft
  scripts/rebuild.sh grafana hard
  scripts/rebuild.sh all soft
EOF
}

SERVICE=${1:-}
MODE=${2:-}

if [[ -z "$SERVICE" || -z "$MODE" || "$SERVICE" == "-h" || "$SERVICE" == "--help" ]]; then
  print_help
  exit 2
fi

core_services=(backend frontend postgres pgadmin)
monitoring_services=(prometheus grafana loki promtail tempo pyroscope otel-collector postgres-exporter)

if [ -d "monitoring" ]; then
  valid_services=("${core_services[@]}" "${monitoring_services[@]}")
  monitoring_present=true
else
  valid_services=("${core_services[@]}")
  monitoring_present=false
fi

is_valid_service() {
  local s="$1"
  [[ "$s" == "all" ]] && return 0
  for v in "${valid_services[@]}"; do [[ "$v" == "$s" ]] && return 0; done
  return 1
}

if ! is_valid_service "$SERVICE"; then
  echo "Unknown service: $SERVICE" >&2
  echo "Valid: ${valid_services[*]} or 'all'" >&2
  exit 2
fi

case "$MODE" in
  soft)
    # No image rebuild. Recreate container to pick up env and bind-mounted configs.
    run_soft() { docker compose up -d --force-recreate "$1"; }
    ;;
  hard)
    # Full image rebuild without cache, then recreate.
    run_soft() { true; }
    run_hard() { docker compose build --no-cache "$1" && docker compose up -d "$1"; }
    ;;
  *)
    echo "Unknown mode: $MODE (expected: soft|hard)" >&2
    exit 2
    ;;
esac

operate() {
  local svc="$1"
  if [[ "$MODE" == "soft" ]]; then
    echo "[soft] Recreating $svc (no build)"
    run_soft "$svc"
  else
    echo "[hard] Rebuilding image and recreating $svc"
    run_hard "$svc"
  fi
}

if [[ "$SERVICE" == "all" ]]; then
  for s in "${valid_services[@]}"; do operate "$s"; done
else
  operate "$SERVICE"
fi

echo "Done. Tail logs with: docker compose logs -f $SERVICE"

