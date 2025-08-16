export type Theme = 'light' | 'dark' | 'system';

export type ColorScheme =
  | 'neutral'
  | 'slate'
  | 'gray'
  | 'zinc'
  | 'stone'
  | 'red'
  | 'orange'
  | 'amber'
  | 'yellow'
  | 'lime'
  | 'green'
  | 'emerald'
  | 'teal'
  | 'cyan'
  | 'sky'
  | 'blue'
  | 'indigo'
  | 'violet'
  | 'purple'
  | 'fuchsia'
  | 'pink'
  | 'rose';

export interface ThemeConfig {
  theme: Theme;
  colorScheme: ColorScheme;
  radius: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  fontSize: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl';
}

export const defaultThemeConfig: ThemeConfig = {
  theme: 'system',
  colorScheme: 'neutral',
  radius: 'md',
  fontSize: 'base',
};

export const colorSchemes: Record<ColorScheme, string> = {
  neutral: 'oklch(0.205 0 0)',
  slate: 'oklch(0.205 0 0)',
  gray: 'oklch(0.205 0 0)',
  zinc: 'oklch(0.205 0 0)',
  stone: 'oklch(0.205 0 0)',
  red: 'oklch(0.577 0.245 27.325)',
  orange: 'oklch(0.577 0.245 27.325)',
  amber: 'oklch(0.577 0.245 27.325)',
  yellow: 'oklch(0.577 0.245 27.325)',
  lime: 'oklch(0.577 0.245 27.325)',
  green: 'oklch(0.577 0.245 27.325)',
  emerald: 'oklch(0.577 0.245 27.325)',
  teal: 'oklch(0.577 0.245 27.325)',
  cyan: 'oklch(0.577 0.245 27.325)',
  sky: 'oklch(0.577 0.245 27.325)',
  blue: 'oklch(0.577 0.245 27.325)',
  indigo: 'oklch(0.577 0.245 27.325)',
  violet: 'oklch(0.577 0.245 27.325)',
  purple: 'oklch(0.577 0.245 27.325)',
  fuchsia: 'oklch(0.577 0.245 27.325)',
  pink: 'oklch(0.577 0.245 27.325)',
  rose: 'oklch(0.577 0.245 27.325)',
};

export const radiusValues = {
  none: '0px',
  sm: '0.125rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  full: '9999px',
};

export const fontSizeValues = {
  xs: '0.75rem',
  sm: '0.875rem',
  base: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
  '3xl': '1.875rem',
};
