import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../lib/context/AuthContext';

type ProtectedRouteProps = {
  children: JSX.Element;
  inverted?: boolean;
};

function ProtectedRoute({ children, inverted = false }: ProtectedRouteProps) {
  const { authenticatedUser } = useContext(AuthContext);

  return !!authenticatedUser !== inverted ? children : <Navigate to="/" />;
}

export default ProtectedRoute;
