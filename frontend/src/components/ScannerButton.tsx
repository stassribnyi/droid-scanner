import { ReactElement, Ref, forwardRef, useState } from 'react';

import { Box, Dialog, IconButton, Slide, useTheme } from '@mui/material';
import { Close, QrCodeScannerRounded } from '@mui/icons-material';
import { TransitionProps } from '@mui/material/transitions';

import { Scanner } from './Scanner';
import { useActivateDroid, useNotify } from '../hooks';
import { tryParseDroidId } from '../utils';

const Transition = forwardRef(
  (props: TransitionProps & { children: ReactElement }, ref: Ref<unknown>) => (
    <Slide direction='up' ref={ref} {...props} />
  )
);

export const ScannerButton = () => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const activateDroid = useActivateDroid();
  const { notify } = useNotify();

  function closeScanner() {
    setIsOpen(false);
  }

  function openScanner() {
    setIsOpen(true);
  }

  return (
    <>
      <IconButton
        onClick={openScanner}
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
          boxShadow: '0px 3px 8px #250f0c,inset 0px 2px 3px #d94834',

          '&:hover': {
            backgroundImage: 'linear-gradient(to bottom, #de4835, #ae2816)',
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
            zIndex: 1,
          }}
        >
          <Close />
        </IconButton>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
          }}
        >
          <Scanner
            onResult={(data) => {
              const droidId = tryParseDroidId(data);
              // TODO: rely on server errors
              if (droidId && 1 <= droidId && droidId <= 20) {
                activateDroid(droidId);
              } else {
                notify({
                  message: 'These aren’t the droids you are looking for!',
                  severity: 'info',
                });
              }

              setIsOpen(false);
            }}
          />
        </Box>
      </Dialog>
    </>
  );
};
