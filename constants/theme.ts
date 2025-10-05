import { Platform } from 'react-native';

export const Colors = {
  dark: {
    text: '#f8fafc',
    background: '#0f172aff',
    card: '#1e293b',
    cardBorder: '#334155',
    tint: '#60a5fa',
    icon: '#cbd5e1',
    tabIconDefault: '#64748b',
    tabIconSelected: '#60a5fa',
    primary: '#3b82f6',
    secondary: '#94a3b8',
    success: '#22c55e',
    warning: '#f59e0b',
    danger: '#ef4444',
    inputBackground: '#0f172aff',
    inputBorder: '#475569',
    buttonText: '#ffffff',
    buttonPrimary: '#2563eb',
    buttonSecondary: '#475569',
    buttonSuccess: '#16a34a',
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
});

export const Shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },
};