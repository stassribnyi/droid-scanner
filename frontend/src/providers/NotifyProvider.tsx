import {
  createContext,
  FC,
  useState,
  useCallback,
  PropsWithChildren,
} from 'react';

import { AlertColor } from '@mui/material';

type Notify = Readonly<{
  message: string;
  severity?: AlertColor;
}>;

type NotifyContextType = Readonly<{
  current: Notify | null;
  notify: { (props: Notify): void; (message: string): void };
  clear: () => void;
}>;

export const NotifyContext = createContext<NotifyContextType>({
  current: null,
  notify: () => {},
  clear: () => {},
});

export const NotifyProvider: FC<PropsWithChildren> = ({ children }) => {
  const [current, setNotify] = useState<NotifyContextType['current']>(null);

  const clear: NotifyContextType['clear'] = useCallback(
    () => setNotify(null),
    []
  );

  const notify: NotifyContextType['notify'] = useCallback<
    NotifyContextType['notify']
  >((props) => {
    if (typeof props === 'string') {
      setNotify({ message: props });

      return;
    }

    setNotify(props);
  }, []);

  return (
    <NotifyContext.Provider
      value={{
        current,
        notify,
        clear,
      }}
    >
      {children}
    </NotifyContext.Provider>
  );
};
