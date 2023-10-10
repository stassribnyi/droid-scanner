import useAxios from 'axios-hooks';
import { useCallback } from 'react';

import { useDeviceUUID } from './useDeviceUUID';
import { Droid } from '../types';

export const useActivateDroid = (): (droidId: number) => Promise<Droid> => {
    const deviceId = useDeviceUUID();
    const [, activateDroid] = useAxios<Droid>(
        {
            url: '/api/droids/activate',
            method: 'PUT',
            params: {
                deviceId,
            },
        },
        {
            manual: true,
        }
    );

    return useCallback((droidId: number) =>
        activateDroid({
            params: {
                droidOrder: droidId
            }
        }).then(({ data }) => data),
        [activateDroid]
    )
}
