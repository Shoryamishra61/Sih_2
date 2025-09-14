import { createTheme } from '@mui/material/styles';

// NutriVeda Ayurvedic Green Theme
const nutrivedaTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2E7D32', // Deep Ayurvedic Green
      light: '#4CAF50',
      dark: '#1B5E20',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#8BC34A', // Light Green
      light: '#AED581',
      dark: '#689F38',
      contrastText: '#000000',
    },
    success: {
      main: '#4CAF50',
      light: '#81C784',
      dark: '#388E3C',
    },
    warning: {
      main: '#FF9800',
      light: '#FFB74D',
      dark: '#F57C00',
    },
    error: {
      main: '#F44336',
      light: '#EF5350',
      dark: '#D32F2F',
    },
    background: {
      default: '#F1F8E9', // Very light green
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1B5E20',
      secondary: '#2E7D32',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      color: '#1B5E20',
    },
    h2: {
      fontWeight: 600,
      color: '#1B5E20',
    },
    h3: {
      fontWeight: 600,
      color: '#2E7D32',
    },
    h4: {
      fontWeight: 500,
      color: '#2E7D32',
    },
    h5: {
      fontWeight: 500,
      color: '#2E7D32',
    },
    h6: {
      fontWeight: 500,
      color: '#2E7D32',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
        },
        contained: {
          boxShadow: '0 2px 8px rgba(46, 125, 50, 0.3)',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(46, 125, 50, 0.4)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1B5E20',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

// Dark theme
const nutrivedaDarkTheme = createTheme({
  ...nutrivedaTheme,
  palette: {
    mode: 'dark',
    primary: {
      main: '#4CAF50',
      light: '#81C784',
      dark: '#2E7D32',
      contrastText: '#000000',
    },
    secondary: {
      main: '#8BC34A',
      light: '#AED581',
      dark: '#689F38',
      contrastText: '#000000',
    },
    success: {
      main: '#4CAF50',
      light: '#81C784',
      dark: '#388E3C',
    },
    warning: {
      main: '#FF9800',
      light: '#FFB74D',
      dark: '#F57C00',
    },
    error: {
      main: '#F44336',
      light: '#EF5350',
      dark: '#D32F2F',
    },
    background: {
      default: '#0D1B0F', // Very dark green
      paper: '#1B2E1F', // Dark green paper
    },
    text: {
      primary: '#E8F5E8',
      secondary: '#C8E6C9',
    },
  },
});

export { nutrivedaTheme, nutrivedaDarkTheme };
