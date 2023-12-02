import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import type { FC, PropsWithChildren } from 'react';

import { useSimpleAuth, useLoader, useNotify } from '../hooks';
import { formatError } from '../utils';

// TODO
import { getDeviceUUID } from '../utils';

export const AxiosErrorHandler: FC<PropsWithChildren> = ({ children }) => {
  const [, , revokeAccess] = useSimpleAuth();
  const [, setLoading] = useLoader();
  const navigate = useNavigate();

  const { notify } = useNotify();

  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use((request) => {
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
        setLoading(false);

        // TODO: learn more about this behavior and how to prevent it
        if (axios.isCancel(error)) {
          return Promise.reject(error);
        }

        // TODO: ping backend team to implement proper authorization
        if (error.response?.status === 404 && error.response.config.url?.includes('/api/me')) {
          localStorage.clear();
          revokeAccess();
          navigate('/');

          return;
        }

        notify({ message: formatError(error), severity: 'error' });

        return {};
      },
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return children;
};
