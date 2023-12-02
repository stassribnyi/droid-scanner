import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import { ScreenContent } from './ScreenContent';
import { Navigation } from './Navigation';
import { Assessment as Home, ArrowBackIosNewRounded as ArrowBack } from '@mui/icons-material';
import { FC, PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';

// TODO: extract appbar
export const BaseScreen: FC<
  PropsWithChildren<{
    title: string;
    onBack?: () => void;
  }>
> = ({ children, title, onBack }) => {
  const navigate = useNavigate();

  return (
    <>
      <ScreenContent>
        <AppBar
          position="absolute"
          sx={{
            background: 'rgba(35, 45, 60, 0.9)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <Toolbar>
            <IconButton
              size="large"
              color="inherit"
              aria-label="back"
              sx={{ left: 0, position: 'absolute' }}
              onClick={onBack ?? (() => navigate(-1))}
            >
              <ArrowBack />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} align="center">
              {title}
            </Typography>
            <IconButton
              size="large"
              color="inherit"
              aria-label="back"
              sx={{ right: 0, position: 'absolute' }}
              onClick={() => navigate('/')}
            >
              <Home />
            </IconButton>
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
};
