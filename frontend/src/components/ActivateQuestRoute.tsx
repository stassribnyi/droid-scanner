import { Outlet, Navigate, useSearchParams } from 'react-router-dom';

export const ActivateQuestRoute: React.FC<
  Readonly<{
    activationPath: string;
  }>
> = ({ activationPath }) => {
  const [params] = useSearchParams('droidId');

  const value = params.get('droidId');
  const questId = value ? parseInt(value, 10) : null;

  if (questId) {
    return <Navigate to={activationPath} state={{ questId }} />;
  }

  return <Outlet />;
};
