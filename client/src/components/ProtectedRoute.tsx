import { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AuthContext } from '../lib/context/AuthContext';

type ProtectedRouteProps = {
  path: string;
  component: React.FC;
  inverted?: boolean;
};

const ProtectedRoute = ({
  path,
  component,
  inverted = false,
}: ProtectedRouteProps) => {
  const { authenticatedUser } = useContext(AuthContext);

  return (
    <>
      {(authenticatedUser !== null) !== inverted ? (
        <Route path={path} component={component} />
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
};

export default ProtectedRoute;
