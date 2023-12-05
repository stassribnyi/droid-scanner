import { isAxiosError } from 'axios';
import { createContext, useEffect, useContext, useCallback, useState } from 'react';

import type { FC, PropsWithChildren } from 'react';

import { useNotify } from '../hooks';
import { formatError } from '../utils';

import useAxios from 'axios-hooks';
import { User } from '../types';

const AuthContext = createContext<{
  isLoggedIn: boolean;
  user: null | User;
  refreshUser: () => Promise<void>;
  register: (userNickname: string) => Promise<void>;
}>({
  user: null,
  isLoggedIn: false,
  refreshUser: () => Promise.reject('Not implemented'),
  register: () => Promise.reject('Not implemented'),
});

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

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
      // TODO: ping backend team to implement proper authorization
      if (isAxiosError(error) && error.response?.status === 404) {
        localStorage.clear();
        setUser(null);
      }

      notify({ message: formatError(error), severity: 'error' });
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

  useEffect(() => {
    // check whether user is present
    refreshUser();
  }, []);

  // TODO: pay close attention to performance
  return (
    <AuthContext.Provider value={{ isLoggedIn: !!user, user, refreshUser, register }}>{children}</AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
