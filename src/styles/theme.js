import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontSize: '14px',
          fontWeight: 'bold',
          color: 'rgba(0, 0, 0, 0.54)',
          '&.Mui-selected': {
            color: 'black', 
          },
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          padding: 0
        },
      },
    },
  },
});

export default theme;
