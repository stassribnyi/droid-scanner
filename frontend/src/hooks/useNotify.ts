import { useContext } from 'react';

import { NotifyContext } from '../providers';

export const useNotify = () => useContext(NotifyContext);
