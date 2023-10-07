import React from 'react';
import ReactDOM from 'react-dom/client';
import { Welcome } from './screens';

import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

import './index.css';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#000312',
    },
    primary: {
      main: '#ff6855',
    },
  },
  shape: {
    borderRadius: 18,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          color: 'white',
        },
      },
    },
  },
  typography: {
    fontSize: 16,
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Welcome />
    </ThemeProvider>
  </React.StrictMode>
);
