import { Outlet, Navigate, useLocation } from 'react-router-dom';

import { useAuthContext } from '../providers/AuthProvider';

export const ProtectedRoute: React.FC<
  Readonly<{
    allowed: 'auth-only' | 'login-only' | 'all';
    navigateTo: string;
  }>
> = ({ allowed, navigateTo: navigatePath }) => {
  const { isLoggedIn } = useAuthContext();
  const location = useLocation();

  switch (allowed) {
    case 'auth-only':
      return isLoggedIn ? <Outlet /> : <Navigate to={navigatePath} />;
    case 'login-only':
      // TODO: restore previos location
      return isLoggedIn ? <Navigate to={navigatePath} state={{ from: location }} replace /> : <Outlet />;
    case 'all':
    default:
      return <Outlet />;
  }
};
