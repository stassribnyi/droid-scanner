import useAxios from 'axios-hooks';
import { useCallback } from 'react';

import { useDeviceUUID } from './useDeviceUUID';
import { Droid } from '../types';
import { useNavigate } from 'react-router';

export const useActivateDroid = (): (droidId: number) => Promise<Droid> => {
    const deviceId = useDeviceUUID();
    const navigate = useNavigate();

    const [, activateDroid] = useAxios<Droid>(
        {
            url: '/api/droids/activate',
            method: 'PUT',
        },
        {
            manual: true,
        }
    );

    return useCallback((droidId: number) =>
        activateDroid({
            params: {
                deviceId, droidOrder: droidId,
            }
        }).then(({ data }) => {
            navigate(`/hint/${data.order}`)

            return data
        }),
        [activateDroid, deviceId, navigate]
    )
}
