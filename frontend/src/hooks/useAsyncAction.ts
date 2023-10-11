import { isAxiosError } from 'axios';
import { useCallback } from 'react';
import { useNavigate } from 'react-router';


import { useLoader } from './useLoader';
import { useNotify } from './useNotify';
import { useSimpleAuth } from './useSimpleAuth';

import { formatError } from '../utils';

// TODO: Why I've created this? so much questions and so little answers, I need to go back and revisit it....
export const useAsyncAction = (action: () => Promise<void>): [boolean, () => Promise<void>] => {
    const [, , revokeAccess] = useSimpleAuth()
    const [loading, setLoading] = useLoader();
    const navigate = useNavigate();

    const { notify } = useNotify();

    const asyncAction = useCallback(async () => {
        try {
            setLoading(true);
            await action();
        } catch (error) {
            if (isAxiosError(error)) {
                if (error.response?.status === 404 && error.response.config.url?.includes('/api/users')) {
                    revokeAccess()
                    navigate('/')

                    return;
                }

                if (error.response?.status === 404 && error.response.config.url?.includes('/api/droids')) {
                    notify({ message: "These aren’t the droids you are looking for!", severity: 'info' });

                    return;
                }
            }

            notify({ message: formatError(error), severity: 'error' });
        } finally {
            setLoading(false);
        }
        // TODO: mmmmm, this is so good, reference that is updated all the time
    }, [action, navigate, notify, revokeAccess, setLoading])

    return [loading, asyncAction]
}
