import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import { ScreenContent } from './ScreenContent';
import { Navigation } from './Navigation';
import { ChevronLeft } from '@mui/icons-material';
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
          width: 444,
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <Toolbar
          sx={{
            background: 'rgba(35, 45, 60, 0.9)',
            backdropFilter: 'blur(8px)',
            width: 444,
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='back'
            sx={{ mr: 2 }}
            onClick={onBack}
          >
            <ChevronLeft />
          </IconButton>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{
        paddingTop: 10,
        paddingBottom: 4
      }}>{children}</Box>
    </ScreenContent>
    <Navigation />
  </>
);
