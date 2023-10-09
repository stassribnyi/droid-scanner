import { useCallback } from 'react';

import { formatError } from '../utils';

import { useLoader } from './useLoader';
import { useNotify } from './useNotify';

// TODO: Why I've created this? so much questions and so little answers, I need to go back and revisit it....
export const useAsyncAction = (action: () => Promise<void>): [boolean, () => Promise<void>] => {
    const [loading, setLoading] = useLoader();
    const { notify } = useNotify();

    const asyncAction = useCallback(async () => {
        try {
            setLoading(true);
            await action();
        } catch (error) {
            notify({ message: formatError(error), severity: 'error' });
        } finally {
            setLoading(false);
        }
        // TODO: mmmmm, this is so good, reference that is updated all the time
    }, [action, notify, setLoading])

    return [loading, asyncAction]
}
