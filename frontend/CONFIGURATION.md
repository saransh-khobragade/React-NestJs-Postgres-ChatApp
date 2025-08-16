# Configuration Guide

This guide covers all the configuration options available in your enhanced shadcn/ui setup.

## 🎨 Theme Configuration

### Theme Modes

The application supports three theme modes:

- **Light**: Always use light theme
- **Dark**: Always use dark theme
- **System**: Automatically follow system preference

### Color Schemes

Available color schemes for customization:

#### Neutral Colors

- `neutral` - Default neutral colors
- `slate` - Slate gray palette
- `gray` - Gray palette
- `zinc` - Zinc gray palette
- `stone` - Stone gray palette

#### Warm Colors

- `red` - Red palette
- `orange` - Orange palette
- `amber` - Amber palette
- `yellow` - Yellow palette
- `lime` - Lime palette

#### Cool Colors

- `green` - Green palette
- `emerald` - Emerald palette
- `teal` - Teal palette
- `cyan` - Cyan palette
- `sky` - Sky blue palette
- `blue` - Blue palette
- `indigo` - Indigo palette
- `violet` - Violet palette
- `purple` - Purple palette
- `fuchsia` - Fuchsia palette
- `pink` - Pink palette
- `rose` - Rose palette

### Border Radius Options

- `none` - 0px (no border radius)
- `sm` - 0.125rem (2px)
- `md` - 0.375rem (6px) - Default
- `lg` - 0.5rem (8px)
- `xl` - 0.75rem (12px)
- `full` - 9999px (fully rounded)

### Font Size Options

- `xs` - 0.75rem (12px)
- `sm` - 0.875rem (14px)
- `base` - 1rem (16px) - Default
- `lg` - 1.125rem (18px)
- `xl` - 1.25rem (20px)
- `2xl` - 1.5rem (24px)
- `3xl` - 1.875rem (30px)

## 🔧 Component Configuration

### Available Components

The following shadcn/ui components are available:

#### Form Components

- `Button` - Various button styles and variants
- `Input` - Text input fields
- `Label` - Form labels
- `Select` - Dropdown select menus
- `Textarea` - Multi-line text input
- `Checkbox` - Checkbox inputs
- `Switch` - Toggle switches

#### Layout Components

- `Card` - Content containers with header and content sections
- `Tabs` - Tabbed interface components

#### Feedback Components

- `Sonner` - Toast notifications (replaces deprecated Toast)

### Adding New Components

To add additional components:

```bash
# Add individual components
npx shadcn@latest add accordion
npx shadcn@latest add alert
npx shadcn@latest add avatar
npx shadcn@latest add badge
npx shadcn@latest add calendar
npx shadcn@latest add carousel
npx shadcn@latest add command
npx shadcn@latest add context-menu
npx shadcn@latest add data-table
npx shadcn@latest add date-picker
npx shadcn@latest add dialog
npx shadcn@latest add drawer
npx shadcn@latest add dropdown-menu
npx shadcn@latest add form
npx shadcn@latest add hover-card
npx shadcn@latest add input-otp
npx shadcn@latest add menubar
npx shadcn@latest add navigation-menu
npx shadcn@latest add pagination
npx shadcn@latest add popover
npx shadcn@latest add progress
npx shadcn@latest add radio-group
npx shadcn@latest add resizable
npx shadcn@latest add scroll-area
npx shadcn@latest add separator
npx shadcn@latest add sheet
npx shadcn@latest add sidebar
npx shadcn@latest add skeleton
npx shadcn@latest add slider
npx shadcn@latest add table
npx shadcn@latest add toggle
npx shadcn@latest add toggle-group
npx shadcn@latest add tooltip
npx shadcn@latest add typography

# Add multiple components at once
npx shadcn@latest add accordion alert avatar badge calendar
```

## 🎯 Usage Examples

### Using the Theme Hook

```tsx
import { useTheme } from '@/hooks/use-theme';

function MyComponent() {
  const {
    config,
    resolvedTheme,
    setTheme,
    setColorScheme,
    setRadius,
    setFontSize,
    resetTheme,
  } = useTheme();

  return (
    <div>
      <p>Current theme: {resolvedTheme}</p>
      <p>Color scheme: {config.colorScheme}</p>
      <p>Border radius: {config.radius}</p>
      <p>Font size: {config.fontSize}</p>

      <button onClick={() => setTheme('dark')}>Switch to Dark</button>

      <button onClick={() => setColorScheme('blue')}>Use Blue Theme</button>
    </div>
  );
}
```

### Using Components

```tsx
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

function MyForm() {
  const handleSubmit = () => {
    toast('Form submitted successfully!');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Form</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          <div>
            <Label htmlFor='name'>Name</Label>
            <Input id='name' placeholder='Enter your name' />
          </div>
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      </CardContent>
    </Card>
  );
}
```

## 🛠️ Customization

### CSS Variables

All theme colors are defined as CSS custom properties in `src/index.css`. You can customize them by modifying the values:

```css
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  /* ... more variables */
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  /* ... dark mode variables */
}
```

### Component Customization

Each component can be customized by editing its source file in `src/components/ui/`. For example, to customize the Button component:

```tsx
// src/components/ui/button.tsx
const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline:
          'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        // Add your custom variants here
        custom: 'bg-gradient-to-r from-blue-500 to-purple-500 text-white',
      },
      // ... rest of the configuration
    },
  },
);
```

## 📱 Responsive Design

The components are built with responsive design in mind. Use Tailwind CSS responsive prefixes:

```tsx
<Card className='w-full md:w-1/2 lg:w-1/3'>
  <CardContent className='p-4 md:p-6'>
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>{/* Content */}</div>
  </CardContent>
</Card>
```

## ♿ Accessibility

All components follow WCAG guidelines and include proper ARIA attributes. Key accessibility features:

- Keyboard navigation support
- Screen reader compatibility
- Focus management
- Color contrast compliance
- Semantic HTML structure

## 🔄 State Management

The theme configuration is automatically persisted to localStorage and restored on page reload. The configuration includes:

- Theme mode (light/dark/system)
- Color scheme selection
- Border radius preference
- Font size preference

## 🚀 Performance

- Components are tree-shakeable
- CSS is optimized with Tailwind CSS
- No runtime CSS-in-JS overhead
- Efficient re-renders with React hooks
- Minimal bundle size impact

## 📚 Additional Resources

- [shadcn/ui Documentation](https://ui.shadcn.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
