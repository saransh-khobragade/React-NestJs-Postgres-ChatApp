# React + TypeScript + Vite + Tailwind CSS + ESLint + Prettier + shadcn/ui

A production-ready React boilerplate with strict TypeScript configuration, comprehensive ESLint rules, Prettier formatting, modern tooling, shadcn/ui components, and a complete authentication and user management system.

## 🚀 Quick Start

```bash
# Install dependencies
yarn install

# Start development server
yarn dev

# Build for production
yarn build

# Run linting
yarn lint

# Fix linting issues
yarn lint:fix

# Format code
yarn format

# Check formatting
yarn format:check

# Type checking
yarn type-check
```

## 🎯 Features

### **✅ Authentication System**

- **Login Form** - Email and password authentication with validation
- **Signup Form** - User registration with name, email, password, and confirmation
- **Form Validation** - Using Zod schema validation with React Hook Form
- **Persistent Sessions** - User sessions stored in localStorage
- **Loading States** - Proper loading indicators during authentication
- **Error Handling** - Comprehensive error states and user feedback

### **✅ User Management Dashboard**

- **User List** - Displays all registered users in a clean table format
- **Statistics** - Shows total users, new users this week, and recently updated users
- **CRUD Operations**:
  - ✅ **Create** - Add new users with a modal form
  - ✅ **Read** - View all users in a responsive table
  - ✅ **Update** - Edit existing user information
  - ✅ **Delete** - Remove users with confirmation
- **Responsive Design** - Works on desktop and mobile
- **Data Persistence** - Local storage with mock API simulation

### **✅ shadcn/ui Components**

- **Modern UI Components** - Beautiful, accessible components
- **Tailwind CSS Integration** - Seamless styling with utility classes
- **TypeScript Support** - Fully typed components
- **Customizable Design** - Easy theming and customization
- **Dark Mode Ready** - Built-in dark mode support
- **Accessible** - WCAG compliant components
- **Theme Configuration** - Dynamic theme switching and customization
- **Component Showcase** - Interactive demo of all available components
- **Persistent Settings** - Theme preferences saved to localStorage
- **System Theme Detection** - Automatic light/dark mode switching

### **✅ TypeScript Configuration**

- **Strict mode enabled** - Maximum type safety
- **Modern ES2022** target
- **React optimized** - Perfect for frontend applications
- **Source maps** - Better debugging experience
- **Project references** - Scalable configuration

### **✅ ESLint Configuration**

- **Ultra-strict rules** - Catches bugs early
- **TypeScript ESLint** - Type-aware linting
- **React-specific rules** - Hooks and component validation
- **Comprehensive rules** - Code quality enforcement
- **Prettier integration** - No formatting conflicts

### **✅ Prettier Configuration**

- **Consistent formatting** - Team-wide code style
- **Trailing commas** - Clean git diffs
- **Single quotes** - Consistent string formatting
- **2-space indentation** - Standard spacing
- **No function spacing** - Clean function declarations

### **✅ VS Code Integration**

- **Auto-fix on save** - ESLint issues fixed automatically
- **Format on save** - Prettier formatting applied
- **Recommended extensions** - Auto-installation prompts
- **TypeScript IntelliSense** - Enhanced development experience

## 🔐 Authentication & User Management

### **How to Use**

1. **Start the Application**: Run `yarn dev` and open `http://localhost:5173`
2. **Sign Up**: Create a new account with your details
3. **Login**: Use your credentials to access the dashboard
4. **Manage Users**:
   - View all users in the table
   - Add new users with the "Add User" button
   - Edit users by clicking the "Edit" button
   - Delete users with the "Delete" button
5. **Logout**: Use the logout button in the header

### **Features**

- 🔐 **Secure Authentication** with form validation
- 📊 **Dashboard Analytics** with user statistics
- 🎨 **Modern UI** with shadcn/ui components
- 📱 **Responsive Design** for all devices
- 💾 **Data Persistence** using localStorage
- ⚡ **Fast Performance** with React 19 and Vite

## 🏗️ Project Structure

```
├── src/
│   ├── App.tsx                    # Main React component with auth routing
│   ├── main.tsx                   # Application entry point
│   ├── index.css                  # Global styles with Tailwind + shadcn/ui
│   ├── components/
│   │   ├── auth/                  # Authentication components
│   │   │   ├── AuthPage.tsx       # Main auth page
│   │   │   ├── LoginForm.tsx      # Login form
│   │   │   └── SignupForm.tsx     # Signup form
│   │   ├── dashboard/             # Dashboard components
│   │   │   ├── Dashboard.tsx      # Main dashboard
│   │   │   └── UserForm.tsx       # User create/edit form
│   │   └── ui/                    # shadcn/ui components
│   ├── contexts/
│   │   └── AuthContext.tsx        # Authentication context
│   ├── services/
│   │   └── userService.ts         # User management service
│   ├── types/
│   │   ├── auth.ts                # Authentication types
│   │   └── user.ts                # User management types
│   ├── lib/                       # Utility functions
│   └── assets/                    # Static assets
├── public/                        # Public assets
├── .husky/                        # Git hooks configuration
├── .vscode/                       # VS Code settings
├── tsconfig.json                  # TypeScript configuration
├── eslint.config.js               # ESLint configuration
├── .prettierrc                    # Prettier configuration
├── components.json                # shadcn/ui configuration
├── vite.config.ts                 # Vite configuration with Tailwind CSS
└── package.json                   # Project dependencies and scripts
```

## 🎨 Using shadcn/ui Components

### Interactive Demo

The project includes a comprehensive component showcase and theme configuration panel:

1. **Start the development server**: `yarn dev`
2. **Open the app** in your browser
3. **Click "Show Config"** to open the theme configuration panel
4. **Explore components** in the interactive showcase
5. **Customize themes** with real-time preview

### Adding New Components

To add new shadcn/ui components to your project:

```bash
# Add a specific component
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
npx shadcn@latest add dialog

# Add multiple components at once
npx shadcn@latest add button card input dialog
```

### Using Components

Import and use components in your React components:

```tsx
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Card</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Click me</Button>
      </CardContent>
    </Card>
  );
}
```

### Available Components

The project includes 12+ components by default. You can add more components from the [shadcn/ui registry](https://ui.shadcn.com/docs/components):

#### Form Components

- **Button** - Various button styles and variants
- **Input** - Text input fields
- **Label** - Form labels
- **Select** - Dropdown select menus
- **Textarea** - Multi-line text input
- **Checkbox** - Checkbox inputs
- **Switch** - Toggle switches

#### Layout Components

- **Card** - Content containers with header and content sections
- **Tabs** - Tabbed interface components

#### Feedback Components

- **Sonner** - Toast notifications (replaces deprecated Toast)

### Theme Configuration

The project includes a powerful theme configuration system:

```tsx
import { useTheme } from '@/hooks/use-theme';

function MyComponent() {
  const { config, setTheme, setColorScheme } = useTheme();

  return (
    <div>
      <button onClick={() => setTheme('dark')}>Dark Mode</button>
      <button onClick={() => setColorScheme('blue')}>Blue Theme</button>
    </div>
  );
}
```

### Customization

Components can be customized by:

- Modifying CSS variables in `src/index.css`
- Editing component files directly in `src/components/ui/`
- Using the theme configuration panel
- Creating custom variants and styles

For detailed configuration options, see [CONFIGURATION.md](./CONFIGURATION.md).

## 🔧 ESLint on Save Setup

This project is configured to show ESLint errors and warnings on save in VS Code with **STRICT** linting rules. The setup includes:

### 📦 Installing VS Code Extensions

This project includes recommended extensions that will be automatically suggested when you open it in VS Code. Here's how to install them:

#### **Method 1: Via VS Code UI (Recommended)**

1. **Open VS Code** in your project directory
2. **Press `Cmd+Shift+P`** (Mac) or `Ctrl+Shift+P` (Windows/Linux)
3. **Type "Extensions: Show Recommended Extensions"** and press Enter
4. **Click "Install All"** or install them individually

#### **Method 2: Via Extensions Panel**

1. **Open VS Code**
2. **Press `Cmd+Shift+X`** (Mac) or `Ctrl+Shift+X` (Windows/Linux) to open Extensions
3. **Look for the "RECOMMENDED" section** at the top
4. **Click "Install All"** or install them individually

#### **Method 3: Via Command Palette**

1. **Press `Cmd+Shift+P`** (Mac) or `Ctrl+Shift+P` (Windows/Linux)
2. **Type "Extensions: Install Extensions from Workspace Recommendations"**
3. **Press Enter**

#### **Method 4: Via Terminal**

```bash
# Install all recommended extensions via terminal
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
code --install-extension ms-vscode.vscode-typescript-next
code --install-extension bradlc.vscode-tailwindcss
code --install-extension ms-vscode.vscode-json
```

### 🔍 Troubleshooting ESLint Issues

If you're not seeing ESLint errors in VS Code:

#### **1. Check if Extensions are Installed**

- Open Extensions panel (`Cmd+Shift+X` or `Ctrl+Shift+X`)
- Search for "ESLint" and ensure it's installed and enabled
- Look for a green checkmark next to the extension

#### **2. Reload VS Code**

- Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows/Linux)
- Type "Developer: Reload Window" and press Enter

#### **3. Check ESLint Status**

- Open the Output panel (`View > Output`)
- Select "ESLint" from the dropdown
- Look for any error messages

#### **4. Verify ESLint is Working**

- Open any `.ts` or `.tsx` file
- Add `console.log('test');` - you should see a red squiggly line
- If you don't see errors, try restarting VS Code

#### **5. Check ESLint Configuration**

```bash
# Test ESLint manually
npx eslint src/App.tsx

# Test the entire project
npx eslint src/ --ext .ts,.tsx
```

### Required VS Code Extensions

- **ESLint** (`dbaeumer.vscode-eslint`) - For ESLint integration
- **Prettier** (`esbenp.prettier-vscode`) - For code formatting
- **TypeScript** (`ms-vscode.vscode-typescript-next`) - For TypeScript support
- **Tailwind CSS** (`bradlc.vscode-tailwindcss`) - For Tailwind CSS IntelliSense

### Features

- ✅ **STRICT** ESLint errors and warnings shown in real-time
- ✅ Auto-fix on save for ESLint issues
- ✅ Prettier formatting on save
- ✅ TypeScript IntelliSense and error checking
- ✅ Conventional commit message validation
- ✅ Pre-commit hooks for linting and formatting
- ✅ Tailwind CSS IntelliSense and autocomplete
- ✅ React hooks validation and optimization

### 🚨 Strict ESLint Rules

#### TypeScript Strict Rules

- `@typescript-eslint/no-explicit-any` - Bans `any` type usage
- `@typescript-eslint/no-non-null-assertion` - Bans `!` non-null assertions
- `@typescript-eslint/no-unsafe-*` - Bans unsafe TypeScript operations
- `@typescript-eslint/prefer-nullish-coalescing` - Enforces `??` over `||`
- `@typescript-eslint/prefer-optional-chain` - Enforces `?.` over `&&`
- `@typescript-eslint/consistent-type-imports` - Enforces consistent import types
- `@typescript-eslint/no-floating-promises` - Bans unhandled promises
- `@typescript-eslint/await-thenable` - Enforces proper async/await usage

#### JavaScript Strict Rules

- `no-console` - **ERROR**: Bans console statements
- `no-debugger` - **ERROR**: Bans debugger statements
- `no-eval` - **ERROR**: Bans eval usage
- `no-var` - **ERROR**: Bans var declarations
- `prefer-const` - **ERROR**: Enforces const over let
- `no-duplicate-imports` - **ERROR**: Bans duplicate imports
- `prefer-template` - **ERROR**: Enforces template literals
- `object-shorthand` - **ERROR**: Enforces object shorthand
- `prefer-destructuring` - **ERROR**: Enforces destructuring

#### React Strict Rules

- `react-hooks/rules-of-hooks` - **ERROR**: Enforces hooks rules
- `react-hooks/exhaustive-deps` - **ERROR**: Enforces complete dependencies

#### Code Style Rules

- `sort-imports` - **ERROR**: Enforces alphabetical import sorting
- `quotes` - **ERROR**: Enforces single quotes
- `semi` - **ERROR**: Enforces semicolons
- `comma-dangle` - **ERROR**: Enforces trailing commas
- `indent` - **ERROR**: Enforces 2-space indentation
- `space-before-function-paren` - **ERROR**: Enforces function spacing
- `object-curly-spacing` - **ERROR**: Enforces object spacing
- `array-bracket-spacing` - **ERROR**: Enforces array spacing

### VS Code Settings

The `.vscode/settings.json` file configures:

- ESLint validation for TypeScript and React files
- Auto-fix on save for ESLint issues
- Prettier as the default formatter
- Format on save enabled

## 📝 Git Hooks

This project uses Husky for Git hooks:

- **Pre-commit**: Runs lint-staged to format and lint staged files
- **Commit-msg**: Validates commit messages follow conventional format

Valid commit message formats:

- `feat: add new feature`
- `fix: resolve bug`
- `docs: update documentation`
- `style: formatting changes`
- `refactor: code refactoring`
- `test: add tests`
- `chore: maintenance tasks`

## 🧪 Testing the Setup

Try these commands to verify everything is working:

```bash
# Test TypeScript compilation
yarn type-check

# Test ESLint
yarn lint

# Test Prettier
yarn format:check

# Test the application
yarn dev
```

## 🔧 Debugging Common Errors

If you encounter TypeScript or ESLint errors, check the **[DEBUG_GUIDE.md](./DEBUG_GUIDE.md)** for solutions to common issues:

- Missing return type annotations
- Using `any` type
- Non-null assertions
- Unsafe operations
- Unused variables
- React hooks rules
- And 25+ more common errors with fixes

The debug guide includes:

- ✅ Exact error messages
- ❌ Wrong code examples
- ✅ Correct code examples
- Quick auto-fix commands

## 🎉 Benefits

- **🔒 Maximum Type Safety** - Strict TypeScript configuration
- **🚫 Prevents Runtime Errors** - Comprehensive ESLint rules
- **🧹 Clean Code** - Consistent formatting and style
- **🛡️ Quality Gate** - Git hooks prevent bad commits
- **📈 Team Consistency** - Same standards across all environments
- **🚀 Production Ready** - Industry best practices
- **⚡ Simple & Clean** - Minimal boilerplate with maximum functionality
- **🎨 Modern Styling** - Tailwind CSS for rapid UI development
- **🔐 Complete Auth System** - Login, signup, and user management
- **📊 User Dashboard** - Full CRUD operations with analytics

This setup ensures high-quality, maintainable React code with excellent developer experience and a complete authentication system!

## 📚 Additional Resources

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
