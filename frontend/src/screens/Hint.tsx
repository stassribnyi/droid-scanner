import { useNavigate } from 'react-router';
import { BaseScreen } from '../components';

export const Hint = () => {
  const navigate = useNavigate();

  return (
    <BaseScreen title='Current Hint' onBack={() => navigate('/')}>
      Here is some hint for you, padawan!
    </BaseScreen>
  );
};
