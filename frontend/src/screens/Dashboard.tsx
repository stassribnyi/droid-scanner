import { Button, Typography } from '@mui/material';
import { useNavigate } from "react-router";

export const Dashboard = () => {
  const navigate = useNavigate()

  return (
    <>
      <Typography align='center'>Dashboard page</Typography>
      <Button onClick={() => navigate("/welcome")}>Go to welcome page</Button>
    </>
  );
};
