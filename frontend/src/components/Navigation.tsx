import { FC, useState } from 'react';

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
import { useNavigate } from 'react-router';

// TODO: refactor this for God's sake!
export const Navigation: FC = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const theme = useTheme();

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
        onClick={() => navigate('/')}
        sx={{
          backgroundColor: '#0e223e',
          borderTopRightRadius: '30px',
          backdropFilter: 'blur(8px)',
          maxWidth: 200,
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
                width: '62px',
                height: '62px',
              }}
            >
              <IconButton
                sx={{
                  color: 'white',
                  transition: theme.transitions.create(
                    ['background-color', 'transform'],
                    {
                      duration: theme.transitions.duration.standard,
                    }
                  ),
                  backgroundImage:
                    '-moz-linear-gradient(top, #de4835, #7d1d10)',
                  boxShadow: '0px 3px 8px #250f0c,inset 0px 2px 3px #ff4b34',

                  '&:hover': {
                    backgroundImage:
                      '-moz-linear-gradient(top, #de4835, #ae2816)',
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
          backgroundColor: '#0e223e',
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
        onClick={() => navigate('/')}
        sx={{
          backgroundColor: '#0e223e',
          backdropFilter: 'blur(8px)',
          borderTopLeftRadius: '30px',
          maxWidth: 200,
        }}
      />
    </BottomNavigation>
  );
};
