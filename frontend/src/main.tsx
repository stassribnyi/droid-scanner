import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createMemoryRouter } from 'react-router';

import { Welcome, Dashboard } from './screens';
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

const memoryHistory = createMemoryRouter([
  {
    path: '/',
    element: <Dashboard />,
  },
  {
    path: '/welcome',
    element: <Welcome />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <RouterProvider router={memoryHistory} />,
    </ThemeProvider>
  </React.StrictMode>
);
