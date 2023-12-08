import { createContext, FC, useState, useCallback, PropsWithChildren, useMemo } from 'react';

import { Alert, AlertColor, Snackbar } from '@mui/material';

type Notify = Readonly<{
  message: string;
  severity?: AlertColor;
}>;

type NotifyContextProps = Readonly<{
  current: Notify | null;
  notify: { (props: Notify): void; (message: string): void };
  clear: () => void;
}>;

export const NotifyContext = createContext<NotifyContextProps>({
  current: null,
  notify: () => {},
  clear: () => {},
});

export const NotifyProvider: FC<PropsWithChildren> = ({ children }) => {
  const [current, setNotify] = useState<NotifyContextProps['current']>(null);

  const clear: NotifyContextProps['clear'] = useCallback(() => setNotify(null), []);
  const notify: NotifyContextProps['notify'] = useCallback<NotifyContextProps['notify']>((props) => {
    if (typeof props === 'string') {
      setNotify({ message: props });

      return;
    }

    setNotify(props);
  }, []);

  const value = useMemo<NotifyContextProps>(
    () => ({
      current,
      notify,
      clear,
    }),
    [current, notify, clear],
  );

  return (
    <NotifyContext.Provider value={value}>
      <Snackbar
        open={!!current}
        onClose={clear}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        {current ? (
          <Alert onClose={clear} severity={current.severity} sx={{ width: '100%' }}>
            {current.message}
          </Alert>
        ) : (
          // prevents icon flickering
          <div />
        )}
      </Snackbar>
      {children}
    </NotifyContext.Provider>
  );
};
