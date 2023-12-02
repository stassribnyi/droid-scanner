import useAxios from 'axios-hooks';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useNotify } from './useNotify';

import { Droid } from '../types';

export const useActivateDroid = (): ((droidId: null | number) => Promise<void>) => {
  const navigate = useNavigate();
  const { notify } = useNotify();

  const [, activateDroid] = useAxios<Droid>(
    {
      url: '/api/droids/activate',
      method: 'PUT',
    },
    { manual: true },
  );

  // TODO: is this a good place for navigation?
  return useCallback(
    async (droidId: null | number) => {
      try {
        if (!droidId) {
          throw new Error('Invalid droid');
        }

        const { data } = await activateDroid({
          params: { droidOrder: droidId },
        });

        navigate(`/quests/${data.order}`);
      } catch (error) {
        if (droidId) {
          notify({
            message: `These aren't the droids you are looking for!`,
            severity: 'info',
          });
        }

        navigate('/dashboard');
      }
    },
    [activateDroid, navigate, notify],
  );
};
