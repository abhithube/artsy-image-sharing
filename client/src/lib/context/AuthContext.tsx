import { createContext, SetStateAction, useState } from 'react';
import { AuthFragment, useAuthQuery } from '../generated/graphql';
import { graphQLClient } from '../graphql/client';

type AuthContextType = {
  isLoading: boolean;
  authenticatedUser: AuthFragment | null;
  setAuthenticatedUser: React.Dispatch<SetStateAction<AuthFragment | null>>;
};

type AuthContextProviderProps = {
  children: React.ReactNode;
};

export const AuthContext = createContext<AuthContextType>({
  isLoading: false,
  authenticatedUser: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setAuthenticatedUser: () => {},
});

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [authenticatedUser, setAuthenticatedUser] =
    useState<AuthFragment | null>(null);

  const { isLoading } = useAuthQuery(graphQLClient, undefined, {
    onSuccess: (data) =>
      setAuthenticatedUser(data.auth?.confirmed ? data.auth : null),
  });

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        authenticatedUser,
        setAuthenticatedUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
