import { FC, PropsWithChildren } from 'react';
import { CssBaseline, GlobalStyles, GlobalStylesProps, ThemeProvider, createTheme } from '@mui/material';

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

  '.noise3': {
    background: 'rgba(35, 45, 60, 0.9)',
    backgroundImage: `url("data:image/svg+xml,%3C!-- svg: first layer --%3E%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='4' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
  },
};

export const Layout: FC<PropsWithChildren> = ({ children }) => (
  <ThemeProvider theme={darkTheme}>
    <GlobalStyles styles={globalStyles} />
    <CssBaseline />
    {children}
  </ThemeProvider>
);
