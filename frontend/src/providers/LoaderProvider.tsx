import { createContext, FC, useState, useCallback, PropsWithChildren } from 'react';

import { Backdrop, CircularProgress } from '@mui/material';

type Toggle = (value: boolean) => void;

export const LoaderContext = createContext<[boolean, Toggle]>([false, () => {}]);

export const LoaderProvider: FC<PropsWithChildren> = ({ children }) => {
  const [loading, setLoader] = useState(false);

  const toggle = useCallback<Toggle>((value) => {
    setLoader(value);
  }, []);

  return (
    <LoaderContext.Provider value={[loading, toggle]}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      {children}
    </LoaderContext.Provider>
  );
};
