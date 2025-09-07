const luxuryGoldTheme = {
  palette: {
    background: {
      default: '#FFF3E0',
      paper: '#FFFFFF',
    },
    primary: {
      main: '#F57C00',
      hover: '#E65100',
      contrastText: '#FFFFFF',
    },
    accent: {
      main: '#FFB74D',
      light: '#FFE0B2',
    },
    neutral: {
      main: '#FFF8E1',
      light: '#FFFFFF',
      dark: '#FFCC80',
    },
    divider: 'rgba(0, 0, 0, 0.08)',
    text: {
      primary: '#BF360C',
      secondary: '#E64A19',
      disabled: '#8D6E63',
    },
    action: {
      hover: 'rgba(245, 124, 0, 0.08)',
      selected: 'rgba(245, 124, 0, 0.14)',
      disabledOpacity: 0.38,
      focus: 'rgba(245, 124, 0, 0.2)',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.125rem',
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h5: {
      fontSize: '1.125rem',
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.2,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px',
          padding: '8px 20px',
          fontWeight: 500,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(45deg, #F59E0B 30%, #D97706 90%)',
          '&:hover': {
            background: 'linear-gradient(45deg, #D97706 30%, #B45309 90%)',
          },
        },
        outlined: {
          borderColor: '#F59E0B',
          color: '#F59E0B',
          '&:hover': {
            backgroundColor: 'rgba(245, 158, 11, 0.08)',
            borderColor: '#D97706',
            color: '#D97706',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.background.paper,
          backgroundImage: 'none',
          borderRadius: 12,
          border: `1px solid ${theme.palette.divider}`,
          boxShadow: '0 6px 20px rgba(0, 0, 0, 0.08)',
          '&:hover': {
            boxShadow: '0 10px 24px rgba(0, 0, 0, 0.12)',
          },
        }),
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundImage: 'none',
          color: theme.palette.text.primary,
        }),
      },
    },
  },
  shape: {
    borderRadius: 8,
  },
};

export default luxuryGoldTheme;
