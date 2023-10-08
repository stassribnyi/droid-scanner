import { FC, useEffect, useState } from 'react';

import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  IconButton,
  useTheme,
} from '@mui/material';
import {
  QrCodeScannerRounded,
  EmojiEventsRounded,
  TipsAndUpdatesRounded,
} from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router';

// TODO: refactor this for God's sake!
export const Navigation: FC = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const theme = useTheme();

  useEffect(() => {
    console.log(pathname);

    if (pathname.includes('/my-collection')) {
      setCurrent(2);
      return;
    }

    if (pathname.includes('/hint')) {
      setCurrent(0);
      return;
    }

    setCurrent(1);
  }, [pathname]);

  return (
    <BottomNavigation
      showLabels
      value={current}
      onChange={(_, newValue) => {
        setCurrent(newValue);
      }}
      sx={{
        backgroundColor: 'transparent',
        justifyContent: 'space-between',
        maxWidth: 444,
        width: '100%',
        margin: '0 auto',
      }}
    >
      <BottomNavigationAction
        label='Current hint'
        icon={<TipsAndUpdatesRounded />}
        onClick={() => navigate('/hint')}
        sx={{
          borderTopRightRadius: '30px',
          maxWidth: 200,
          background: 'rgba(35, 45, 60, 0.9)',
          backdropFilter: 'blur(8px)',
        }}
      />
      <BottomNavigationAction
        icon={
          <Box
            sx={{
              position: 'relative',
              backgroundColor: '#000312',
              width: '100%',
              height: '100%',
              borderBottomLeftRadius: '100px',
              borderBottomRightRadius: '100px',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: 'calc(-100% - 8px)',
                left: '50%',
                transform: 'translateX(-50%)',
                borderRadius: '50%',
                width: '62px',
                height: '62px',
              }}
            >
              <IconButton
                sx={{
                  backdropFilter: 'blur(8px)',

                  color: 'white',
                  transition: theme.transitions.create(
                    ['background-color', 'transform'],
                    {
                      duration: theme.transitions.duration.standard,
                    }
                  ),
                  backgroundImage:
                    'linear-gradient(to bottom, rgba(222, 72, 53, 0.9), rgba(125, 29, 16, 0.9))',
                  boxShadow: '0px 3px 8px #250f0c,inset 0px 2px 3px #ff4b34',

                  '&:hover': {
                    backgroundImage:
                      'linear-gradient(to bottom, #de4835, #ae2816)',
                    transform: ' scale(1.1)',
                  },
                }}
              >
                <QrCodeScannerRounded
                  sx={{
                    width: '100%',
                    height: '100%',
                  }}
                />
              </IconButton>
            </Box>
          </Box>
        }
        onClick={() => navigate('/scan')}
        sx={{
          background: 'rgba(35, 45, 60, 0.9)',
          backdropFilter: 'blur(8px)',
          flex: 0,
          minWidth: '74px',
          padding: 0,
          height: '32px',
          marginTop: 'auto',
          // paddingBottom: '4px',
        }}
      />
      <BottomNavigationAction
        label='Progress'
        icon={<EmojiEventsRounded />}
        onClick={() => navigate('/my-collection')}
        sx={{
          background: 'rgba(35, 45, 60, 0.9)',
          backdropFilter: 'blur(8px)',
          borderTopLeftRadius: '30px',
          maxWidth: 200,
        }}
      />
    </BottomNavigation>
  );
};
