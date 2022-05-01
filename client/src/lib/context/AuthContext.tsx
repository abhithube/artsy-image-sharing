import { useQuery } from '@apollo/client';
import { createContext, useMemo, useState } from 'react';
import { AUTH } from '../graphql';
import { User } from '../interfaces';

type AuthContextType = {
  loading: boolean;
  authenticatedUser: User | null;
  setAuthenticatedUser: React.Dispatch<React.SetStateAction<User | null>>;
};

type AuthContextProviderProps = {
  children: React.ReactNode;
};

export const AuthContext = createContext<AuthContextType>({
  loading: false,
  authenticatedUser: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setAuthenticatedUser: () => {},
});

export default function AuthContextProvider({
  children,
}: AuthContextProviderProps) {
  const [authenticatedUser, setAuthenticatedUser] = useState<User | null>(null);

  const { loading } = useQuery(AUTH, {
    onCompleted: (data) =>
      setAuthenticatedUser(data.auth?.confirmed ? data.auth : null),
  });

  const value = useMemo(
    () => ({
      loading,
      authenticatedUser,
      setAuthenticatedUser,
    }),
    [authenticatedUser, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
