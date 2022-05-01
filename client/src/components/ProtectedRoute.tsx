import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../lib/context';

type ProtectedRouteProps = {
  children: JSX.Element;
  inverted?: boolean;
};

export default function ProtectedRoute({
  children,
  inverted = false,
}: ProtectedRouteProps) {
  const { authenticatedUser } = useContext(AuthContext);

  return !!authenticatedUser !== inverted ? children : <Navigate to="/" />;
}
