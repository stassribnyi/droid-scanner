import { isAxiosError } from 'axios';
import { createContext, useEffect, useContext, useCallback, useState } from 'react';

import type { FC, PropsWithChildren } from 'react';

import { useNotify } from '../hooks';

import useAxios from 'axios-hooks';
import { User } from '../types';
import { useLocalStorage } from '@uidotdev/usehooks';

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

  // keep session status for optimistic UI rendering
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage<boolean>('is-logged-in', false);

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
      setIsLoggedIn(true);
    } catch (error) {
      // TODO: ping backend team to implement proper authorization
      if (isAxiosError(error) && error.response?.status === 404) {
        setIsLoggedIn(false);
        setUser(null);
        localStorage.clear();

        notify({ message: "We couldn't find your profile in our ranks, wanna join us?", severity: 'info' });

        return;
      }

      notify({ message: 'Hm, there is too much recruits lately, please try again later!', severity: 'info' });
    }
  }, [notify, registerUser]);

  const register = useCallback(
    async (userNickname: string) => {
      try {
        const { data } = await registerUser({
          params: { userNickname },
        });

        setUser(data);
        setIsLoggedIn(true);
      } catch (error) {
        notify({ message: 'Our register terminal seems to be bugging out, please try again later!', severity: 'info' });
      }
    },
    [notify, registerUser],
  );

  useEffect(() => {
    // check whether user is present
    refreshUser();
  }, []);

  // TODO: pay close attention to performance
  return <AuthContext.Provider value={{ isLoggedIn, user, refreshUser, register }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
