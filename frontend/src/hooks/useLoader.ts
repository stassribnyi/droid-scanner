import { useContext } from 'react';

import { LoaderContext } from '../providers';

export const useLoader = () => useContext(LoaderContext);
