export const Theme = {
  Colors: {
    // Core theme colors
    primary: '#007BFF',         // Blue
    primaryDark: '#0056b3',

    // Accent colors
    secondary: '#FFA500',       // Orange
    success: '#28A745',         // Green
    warning: '#FFC107',
    danger: '#DC3545',

    // Neutrals
    white: '#FFFFFF',
    black: '#000000',
    black90: '#1A1A1A',
    black80: '#3A3A3A',
    black70: '#444444',
    gray: '#7D7D7D',
    lightGray: '#E0E0E0',
    background: '#F9F9F9',

    // Navigation specific
    activeNavBackground: '#007BFF',  // Blue
    inactiveNavBackground: '#FFFFFF',
    activeNavText: '#FFFFFF',
    inactiveNavText: '#7D7D7D',
    navIconColor: '#7D7D7D',
  },

  Fonts: {
    regular: 'System',
    bold: 'System-Bold',
    italic: 'System-Italic',
    boldItalic: 'System-BoldItalic',
  },

  FontSizes: {
    xs: 12,
    small: 14,
    medium: 18,
    large: 22,
    xl: 28,
  },

  FontWeights: {
    light: '300',
    normal: '400',
    medium: '500',
    semiBold: '600',
    bold: '700',
  },

  Spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
  },

  BorderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 20,
  },

  Shadows: {
    light: {
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowRadius: 3,
      elevation: 1,
    },
    medium: {
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 4,
    },
    heavy: {
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowRadius: 10,
      elevation: 8,
    },
  },
};
