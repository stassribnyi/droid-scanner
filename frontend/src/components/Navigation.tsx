import { FC, useEffect, useState } from 'react';

import { BottomNavigation, BottomNavigationAction, Box } from '@mui/material';
import { EmojiEventsRounded, TipsAndUpdatesRounded } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router';

import { ScannerButton } from '../components';

// TODO: refactor this for God's sake!
export const Navigation: FC = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
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
          color: 'white'
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
              <ScannerButton />
            </Box>
          </Box>
        }
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
          color: 'white'
        }}
      />
    </BottomNavigation>
  );
};
