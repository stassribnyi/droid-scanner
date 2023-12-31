import axios from 'axios';
import { useLayoutEffect } from 'react';

import type { FC, PropsWithChildren } from 'react';

import { useLoader, useNotify } from '../hooks';

// TODO
import { getDeviceUUID } from '../utils';

export const AxiosInterceptors: FC<PropsWithChildren> = ({ children }) => {
  const [, setLoading] = useLoader();
  const { notify } = useNotify();

  // register interceptors before any visual feedback to make sure,
  // that requests from useEffeck are being intercepted
  useLayoutEffect(() => {
    const requestInterceptor = axios.interceptors.request.use((request) => {
      // TODO: add message for requests that are taking too long
      setLoading(true);

      const deviceId = getDeviceUUID();

      // TODO: ask backend team to request deviceId via headers
      request.params = { ...request.params, deviceId };

      return request;
    });

    const responseInterceptor = axios.interceptors.response.use(
      (response) => {
        setLoading(false);

        return response;
      },
      (error) => {
        // TODO: learn more about this behavior and how to prevent it
        if (axios.isCancel(error)) {
          return Promise.reject(error);
        }

        // TODO: this might not be called when request is cancelled
        setLoading(false);

        if (error.response?.status === 500) {
          notify({ message: 'Sorry, our camp is under atack, please wait and retry later!', severity: 'error' });

          return { data: null };
        }

        return Promise.reject(error);
      },
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return children;
};
