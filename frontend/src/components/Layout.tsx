import { FC, PropsWithChildren } from 'react';
import {
  CssBaseline,
  GlobalStyles,
  GlobalStylesProps,
  ThemeProvider,
  createTheme,
} from '@mui/material';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

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

const globalStyles: GlobalStylesProps['styles'] = {
  body: {
    margin: 0,
    padding: 0,
  },

  '#root': {
    display: 'flex',
    flexDirection: 'column',
    height: '100dvh',
  },
};

export const Layout: FC<PropsWithChildren> = ({ children }) => (
  <ThemeProvider theme={darkTheme}>
    <GlobalStyles styles={globalStyles} />
    <CssBaseline />
    {children}
  </ThemeProvider>
);
