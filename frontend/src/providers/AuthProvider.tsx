import axios from 'axios';
import { createContext, useEffect, useContext, useCallback, useState } from 'react';

import type { FC, PropsWithChildren } from 'react';

import { useLoader, useNotify } from '../hooks';
import { formatError } from '../utils';

// TODO
import { getDeviceUUID } from '../utils';
import useAxios from 'axios-hooks';
import { User } from '../types';

const AuthContext = createContext<{
  isLoggedIn: boolean;
  refreshUser: () => Promise<void>;
  register: (userNickname: string) => Promise<void>;
}>({
  isLoggedIn: false,
  refreshUser: () => Promise.reject('Not implemented'),
  register: () => Promise.reject('Not implemented'),
});

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [, setLoading] = useLoader();

  const { notify } = useNotify();

  const [, registerUser] = useAxios<User>(
    {
      method: 'POST',
      url: '/api/users/register',
    },
    { manual: true },
  );

  const [, fetchUser] = useAxios<User>('/api/me', { manual: true });

  const refreshUser = useCallback(async () => {
    try {
      const { data } = await fetchUser();

      setUser(data);
    } catch (error) {
      notify({ message: formatError(error), severity: 'error' });
      setUser(null);
    }
  }, [notify, registerUser]);

  const register = useCallback(
    async (userNickname: string) => {
      try {
        const { data } = await registerUser({
          params: { userNickname },
        });

        setUser(data);
      } catch (error) {
        notify({ message: formatError(error), severity: 'error' });
      }
    },
    [notify, registerUser],
  );

  // TODO: de-couple?
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
          setUser(null);

          return;
        }

        notify({ message: formatError(error), severity: 'error' });

        return {};
      },
    );

    refreshUser();

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  // TODO: pay close attention to performance
  return <AuthContext.Provider value={{ isLoggedIn: !!user, refreshUser, register }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
