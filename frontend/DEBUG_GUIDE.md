# TypeScript & ESLint Debug Guide for React

This guide helps you fix common errors from our strict TypeScript and ESLint configuration in React projects.

## Quick Commands

```bash
yarn lint          # Check for linting errors
yarn lint:fix      # Auto-fix linting errors
yarn type-check    # TypeScript type checking
```

## Common ESLint Errors & Fixes

### 1. Missing Return Type Annotations

**Error:**

```
Missing return type on function @typescript-eslint/explicit-function-return-type
```

**Fix:**

```typescript
// ❌ Wrong
function greet(name: string) {
  return `Hello, ${name}!`;
}

// ✅ Correct
function greet(name: string): string {
  return `Hello, ${name}!`;
}

// For React components
// ❌ Wrong
function MyComponent({ name }: { name: string }) {
  return <div>Hello, {name}!</div>;
}

// ✅ Correct
function MyComponent({ name }: { name: string }): JSX.Element {
  return <div>Hello, {name}!</div>;
}
```

### 2. Using `any` Type

**Error:**

```
Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
```

**Fix:**

```typescript
// ❌ Wrong
const data: any = { message: 'test' };

// ✅ Correct
const data: { message: string } = { message: 'test' };
// or
const data = { message: 'test' } as const;
```

### 3. Non-null Assertions

**Error:**

```
Forbidden non-null assertion @typescript-eslint/no-non-null-assertion
```

**Fix:**

```typescript
// ❌ Wrong
const element = document.getElementById('test')!;

// ✅ Correct
const element = document.getElementById('test');
if (element) {
  // use element safely
}
```

### 4. Unsafe Array Access

**Error:**

```
Unsafe member access @typescript-eslint/no-unsafe-member-access
```

**Fix:**

```typescript
// ❌ Wrong
const arr = [1, 2, 3];
const first = arr[0];

// ✅ Correct
const arr = [1, 2, 3] as const;
const first = arr[0]; // Now safe because array is readonly
// or
const first = arr[0] ?? 0; // Provide fallback
```

### 5. Implicit Any Parameters

**Error:**

```
Argument 'data' should be typed @typescript-eslint/explicit-module-boundary-types
```

**Fix:**

```typescript
// ❌ Wrong
function process(data) {
  return data.toString();
}

// ✅ Correct
function process(data: unknown): string {
  return String(data);
}
```

### 6. Unused Variables

**Error:**

```
'unusedVar' is assigned a value but never used @typescript-eslint/no-unused-vars
```

**Fix:**

```typescript
// ❌ Wrong
const unusedVar = 'this should trigger an error';

// ✅ Correct
const _unusedVar = 'prefix with underscore to ignore';
// or remove the variable entirely
```

### 7. Console Statements

**Error:**

```
Unexpected console statement no-console
```

**Fix:**

```typescript
// ❌ Wrong
console.log('This should be flagged');

// ✅ Correct
// Use proper logging library or remove
// For debugging, use: // eslint-disable-next-line no-console
```

### 8. Using `var`

**Error:**

```
Unexpected var, use let or const instead no-var
```

**Fix:**

```typescript
// ❌ Wrong
var oldStyle = 'should use const or let';

// ✅ Correct
const oldStyle = 'should use const or let';
```

### 9. Missing Semicolons

**Error:**

```
Missing semicolon semi
```

**Fix:**

```typescript
// ❌ Wrong
const noSemicolon = 'missing semicolon';

// ✅ Correct
const noSemicolon = 'missing semicolon';
```

### 10. Wrong Quote Style

**Error:**

```
Strings must use singlequote quotes
```

**Fix:**

```typescript
// ❌ Wrong
const wrongQuotes = 'should use single quotes';

// ✅ Correct
const wrongQuotes = 'should use single quotes';
```

### 11. Unreachable Code

**Error:**

```
Unreachable code no-unreachable
```

**Fix:**

```typescript
// ❌ Wrong
function unreachable() {
  return 'test';
  console.log('This will never execute');
}

// ✅ Correct
function unreachable() {
  return 'test';
}
```

### 12. Non-exhaustive Switch

**Error:**

```
Switch is not exhaustive. Cases not matched: "c" @typescript-eslint/switch-exhaustiveness-check
```

**Fix:**

```typescript
// ❌ Wrong
function switchTest(value: 'a' | 'b' | 'c') {
  switch (value) {
    case 'a':
      return 'A';
    case 'b':
      return 'B';
    // Missing case 'c'
  }
}

// ✅ Correct
function switchTest(value: 'a' | 'b' | 'c'): string {
  switch (value) {
    case 'a':
      return 'A';
    case 'b':
      return 'B';
    case 'c':
      return 'C';
  }
}
```

### 13. Floating Promises

**Error:**

```
Promises must be awaited @typescript-eslint/no-floating-promises
```

**Fix:**

```typescript
// ❌ Wrong
Promise.resolve('test');

// ✅ Correct
await Promise.resolve('test');
// or
void Promise.resolve('test'); // Explicitly ignore
```

### 14. Missing Await in Async Functions

**Error:**

```
Async function 'asyncTest' has no 'await' expression require-await
```

**Fix:**

```typescript
// ❌ Wrong
async function asyncTest() {
  return Promise.resolve('test');
}

// ✅ Correct
function asyncTest() {
  return Promise.resolve('test');
}
// or
async function asyncTest() {
  return await Promise.resolve('test');
}
```

## React-Specific Errors

### 15. React Hooks Rules

**Error:**

```
React Hook "useState" is called conditionally react-hooks/rules-of-hooks
```

**Fix:**

```typescript
// ❌ Wrong
function MyComponent({ condition }: { condition: boolean }) {
  if (condition) {
    const [state, setState] = useState('');
  }
  return <div>Hello</div>;
}

// ✅ Correct
function MyComponent({ condition }: { condition: boolean }) {
  const [state, setState] = useState('');
  if (condition) {
    // use state here
  }
  return <div>Hello</div>;
}
```

### 16. Missing Dependencies in useEffect

**Error:**

```
React Hook useEffect has missing dependencies react-hooks/exhaustive-deps
```

**Fix:**

```typescript
// ❌ Wrong
useEffect(() => {
  console.log(count);
}, []); // Missing count dependency

// ✅ Correct
useEffect(() => {
  console.log(count);
}, [count]); // Include all dependencies
```

## Common TypeScript Errors & Fixes

### 1. Strict Null Checks

**Error:**

```
Object is possibly 'null' or 'undefined'
```

**Fix:**

```typescript
// ❌ Wrong
const element = document.getElementById('test');
element.innerHTML = 'test';

// ✅ Correct
const element = document.getElementById('test');
if (element) {
  element.innerHTML = 'test';
}
```

### 2. No Unchecked Indexed Access

**Error:**

```
Element implicitly has an 'any' type because index expression is not of type 'number'
```

**Fix:**

```typescript
// ❌ Wrong
const obj = { a: 1, b: 2 };
const value = obj['a'];

// ✅ Correct
const obj = { a: 1, b: 2 } as const;
const value = obj['a']; // Now safe
// or
const value = obj['a'] ?? 0; // Provide fallback
```

### 3. Exact Optional Property Types

**Error:**

```
Type 'undefined' is not assignable to type 'string'
```

**Fix:**

```typescript
// ❌ Wrong
interface User {
  name?: string;
}
const user: User = { name: undefined };

// ✅ Correct
interface User {
  name?: string | undefined;
}
const user: User = { name: undefined };
```

## Auto-fix Commands

Many errors can be auto-fixed:

```bash
# Fix auto-fixable ESLint errors
yarn lint:fix

# Format code with Prettier
yarn format
```

## Ignoring Specific Rules

For exceptional cases, you can disable rules:

```typescript
// Disable for next line
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const data: any = {};

// Disable for entire file (use sparingly)
/* eslint-disable @typescript-eslint/no-explicit-any */
```

## Best Practices

1. **Always add return types** to functions
2. **Avoid `any`** - use `unknown` or proper types
3. **Use `const`** instead of `let` when possible
4. **Handle null/undefined** explicitly
5. **Use proper error handling** for async operations
6. **Prefer readonly** when possible
7. **Use type guards** for runtime type checking
8. **Follow React hooks rules** strictly
9. **Include all dependencies** in useEffect

## Additional TypeScript Rules

### 4. Strict Function Types

**Error:**

```
Type '(x: string | number) => void' is not assignable to type '(x: string) => void'
```

**Fix:**

```typescript
// ❌ Wrong
type Handler = (x: string) => void;
const handler: Handler = (x: string | number) => {};

// ✅ Correct
type Handler = (x: string) => void;
const handler: Handler = (x: string) => {};
```

### 5. No Unused Labels

**Error:**

```
Label 'loop' is defined but never used
```

**Fix:**

```typescript
// ❌ Wrong
loop: for (let i = 0; i < 10; i++) {
  if (i === 5) break;
}

// ✅ Correct
for (let i = 0; i < 10; i++) {
  if (i === 5) break;
}
```

### 6. No Fallthrough Cases in Switch

**Error:**

```
Fallthrough case in switch statement
```

**Fix:**

```typescript
// ❌ Wrong
switch (value) {
  case 'a':
    console.log('A');
  case 'b':
    console.log('B');
}

// ✅ Correct
switch (value) {
  case 'a':
    console.log('A');
    break;
  case 'b':
    console.log('B');
    break;
}
```

## Additional ESLint Rules

### 17. Prefer Nullish Coalescing

**Error:**

```
Prefer nullish coalescing operator (`??`) instead of a logical OR (`||`) @typescript-eslint/prefer-nullish-coalescing
```

**Fix:**

```typescript
// ❌ Wrong
const value = data || 'default';

// ✅ Correct
const value = data ?? 'default';
```

### 18. Prefer Optional Chaining

**Error:**

```
Prefer optional chaining over `&&` @typescript-eslint/prefer-optional-chain
```

**Fix:**

```typescript
// ❌ Wrong
const value = obj && obj.prop && obj.prop.nested;

// ✅ Correct
const value = obj?.prop?.nested;
```

### 19. No Unnecessary Type Assertion

**Error:**

```
This assertion is unnecessary @typescript-eslint/no-unnecessary-type-assertion
```

**Fix:**

```typescript
// ❌ Wrong
const str = 'hello' as string;

// ✅ Correct
const str = 'hello';
```

### 20. Prefer Const Assertion

**Error:**

```
Prefer `as const` over type assertion @typescript-eslint/prefer-as-const
```

**Fix:**

```typescript
// ❌ Wrong
const colors = ['red', 'green', 'blue'] as string[];

// ✅ Correct
const colors = ['red', 'green', 'blue'] as const;
```

### 21. No Empty Function

**Error:**

```
Empty function @typescript-eslint/no-empty-function
```

**Fix:**

```typescript
// ❌ Wrong
function noop() {}

// ✅ Correct
function noop(): void {
  // Intentionally empty
}
```

### 22. No Inferrable Types

**Error:**

```
Type annotation is unnecessary @typescript-eslint/no-inferrable-types
```

**Fix:**

```typescript
// ❌ Wrong
const name: string = 'John';

// ✅ Correct
const name = 'John';
```

### 23. Strict Boolean Expressions

**Error:**

```
This condition is always truthy/falsy @typescript-eslint/strict-boolean-expressions
```

**Fix:**

```typescript
// ❌ Wrong
if (data) {
  // data might be empty string, 0, etc.
}

// ✅ Correct
if (data !== null && data !== undefined && data !== '') {
  // explicit check
}
```

### 24. No Unnecessary Condition

**Error:**

```
Unnecessary optional chain @typescript-eslint/no-unnecessary-condition
```

**Fix:**

```typescript
// ❌ Wrong
const value = obj?.prop; // when obj is known to be non-null

// ✅ Correct
const value = obj.prop;
```

### 25. Prefer Includes Over IndexOf

**Error:**

```
Prefer `includes()` over `indexOf()` @typescript-eslint/prefer-includes
```

**Fix:**

```typescript
// ❌ Wrong
if (array.indexOf(item) !== -1) {
}

// ✅ Correct
if (array.includes(item)) {
}
```

## Need Help?

If you encounter an error not covered here:

1. Check the error message for the rule name
2. Look up the rule in the [TypeScript ESLint documentation](https://typescript-eslint.io/rules/)
3. Use `yarn lint:fix` to auto-fix what's possible
4. Ask for help with specific error messages
