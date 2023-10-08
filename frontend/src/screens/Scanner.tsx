import { forwardRef, useEffect, useState } from 'react';

import { Scanner as QrReader } from '../components/Scanner';
import {
  Button,
  Dialog,
  IconButton,
  Slide,
} from '@mui/material';
import { Navigation, ScreenContent } from '../components';
import { TransitionProps } from '@mui/material/transitions';
import { Close } from '@mui/icons-material';
import { useNavigate } from 'react-router';

function getDroidById(id: number) {
  switch (id) {
    case 125:
      return 'c3po.png';
    case 225:
      return 'r2d2.jpg';
    case 325:
      return 'r3s6.webp';
    default:
      return '';
  }
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export const Scanner = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [droidUrl, setDroidUrl] = useState('');
  const navigate = useNavigate()

  function showDroid(id: number) {
    if (id) {
      setDroidUrl(getDroidById(id));
    }
  }

  function closeScanner(){
   setIsOpen(() => false)
   navigate('/')
  }

  useEffect(() => {
    setIsOpen(true)
  }, [])


  return (
    <>
      <ScreenContent>
        <Button
          variant='contained'
          onClick={() => {
            setIsOpen((open) => !open);
            setDroidUrl('');
          }}
        >
          Scan me!
        </Button>
        {droidUrl && (
          <img
            src={`/droid-scanner/${droidUrl}`}
            alt=''
            width='100%'
            height='100%'
          />
        )}
        <Dialog
          fullScreen
          open={isOpen}
          onClose={closeScanner}
          TransitionComponent={Transition}
          
        >
            <IconButton
                edge='start'
                color='inherit'
                onClick={closeScanner}
                aria-label='close'
                sx={{
                  position: 'absolute',
                  top: '0.5rem',
                  left: '1rem',
                  zIndex: 1
                }}
              >
                <Close />
              </IconButton>
          <QrReader
            onResult={(id) => {
              showDroid(id);
              setIsOpen(false);
            }}
          />
        </Dialog>
      </ScreenContent>
      <Navigation />
    </>
  );
};
