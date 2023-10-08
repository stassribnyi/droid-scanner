import { useNavigate, useParams } from 'react-router';
import { BaseScreen } from '../components';

export const Hint = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <BaseScreen title='Current Hint' onBack={() => navigate('/')}>
      Here is some hint for you, padawan!
      <br />
      Droid id: {id}
    </BaseScreen>
  );
};
