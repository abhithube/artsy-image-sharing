import { createContext, SetStateAction, useState } from 'react';
import { graphQLClient } from '../App';
import { Auth, useAuthQuery } from '../generated/graphql';

type AuthContextType = {
  isLoading: boolean;
  authenticatedUser: Auth | null;
  setAuthenticatedUser: React.Dispatch<SetStateAction<Auth | null>>;
};

type AuthContextProviderProps = {
  children: React.ReactNode;
};

export const AuthContext = createContext<AuthContextType>({
  isLoading: false,
  authenticatedUser: null,
  setAuthenticatedUser: () => {},
});

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const { isLoading } = useAuthQuery(graphQLClient, undefined, {
    onSuccess: data =>
      setAuthenticatedUser(data.auth?.confirmed ? data.auth : null),
  });
  const [authenticatedUser, setAuthenticatedUser] = useState<Auth | null>(null);

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