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
      // TODO: restore previos location
      return isLoggedIn ? <Outlet /> : <Navigate to={navigatePath} state={{ from: location }} replace />;
    case 'login-only':
      return isLoggedIn ? <Navigate to={navigatePath} /> : <Outlet />;
    case 'all':
    default:
      return <Outlet />;
  }
};
