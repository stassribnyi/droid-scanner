import { createContext, FC, useState, useCallback, PropsWithChildren, useMemo } from 'react';

import { Backdrop, CircularProgress } from '@mui/material';

type Toggle = (value: boolean) => void;
type LoaderContextProps = [boolean, Toggle];

export const LoaderContext = createContext<LoaderContextProps>([false, () => {}]);

export const LoaderProvider: FC<PropsWithChildren> = ({ children }) => {
  const [loading, setLoader] = useState(false);
  const toggle = useCallback<Toggle>((value) => setLoader(value), []);

  const value = useMemo<LoaderContextProps>(() => [loading, toggle], [loading, toggle]);

  return (
    <LoaderContext.Provider value={value}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      {children}
    </LoaderContext.Provider>
  );
};
