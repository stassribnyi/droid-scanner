import { Snackbar, Alert } from '@mui/material';
import { useNotify } from '../hooks/useNotify';

export const Notification = () => {
  const { current, clear } = useNotify();
  const open = current !== null;

  return (
    <Snackbar
      open={open}
      onClose={clear}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      {open ? (
        <Alert onClose={clear} severity={current.severity} sx={{ width: '100%' }}>
          {current.message}
        </Alert>
      ) : (
        // prevents icon flickering
        <div />
      )}
    </Snackbar>
  );
};
