import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import { ScreenContent } from './ScreenContent';
import { Navigation } from './Navigation';
import { Home } from '@mui/icons-material';
import { FC, PropsWithChildren } from 'react';

// TODO: extract appbar
export const BaseScreen: FC<
  PropsWithChildren<{
    title: string;
    onBack: () => void;
  }>
> = ({ children, title, onBack }) => (
  <>
    <ScreenContent>
      <AppBar
        position='absolute'
        sx={{
          background: 'rgba(35, 45, 60, 0.9)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='back'
            sx={{ mr: 2, position: 'absolute' }}
            onClick={onBack}
          >
            <Home />
          </IconButton>
          <Typography
            variant='h6'
            component='div'
            sx={{ flexGrow: 1 }}
            align='center'
          >
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          paddingTop: 10,
          paddingBottom: 4,
        }}
      >
        {children}
      </Box>
    </ScreenContent>
    <Navigation />
  </>
);
