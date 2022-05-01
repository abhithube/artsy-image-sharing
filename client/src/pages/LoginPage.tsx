import { useApolloClient, useMutation } from '@apollo/client';
import { LockClosedIcon, UserCircleIcon } from '@heroicons/react/solid';
import { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AvatarSelectionModal from '../components/AvatarSelectionModal';
import Alert from '../lib/components/Alert';
import Button from '../lib/components/Button';
import { AuthContext } from '../lib/context';
import { AUTH, LOGIN } from '../lib/graphql';

export default function LoginPage() {
  const { setAuthenticatedUser } = useContext(AuthContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);

  const client = useApolloClient();

  const [login] = useMutation(LOGIN, {
    onCompleted: (data) => {
      if (data.auth.confirmed) {
        setAuthenticatedUser(data.auth);
        client.writeQuery({ query: AUTH, data });

        const redirect = localStorage.getItem('redirect');
        navigate(redirect || '/posts');
        localStorage.removeItem('redirect');
      } else {
        setLoading(false);
        setIsOpen(true);
      }
    },
    onError: () => {
      setLoading(false);
      setError('Invalid credentials');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    login({
      variables: {
        username,
        password,
      },
    });
  };

  const handleAvatarSelection = (avatar: string) => {
    setLoading(true);
    login({
      variables: {
        username,
        password,
        avatar,
      },
    });
  };

  return (
    <>
      <AvatarSelectionModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleAvatarSelection={handleAvatarSelection}
      />
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-semibold mb-4">Login</h1>
        <form
          className="flex flex-col p-8 w-[400px] bg-gray-800 rounded-lg shadow-md"
          onSubmit={handleSubmit}
        >
          {(location as any).state?.registered && (
            <Alert type="success" message="Created account successfully" />
          )}
          {(location as any).state?.unauthenticated && (
            <Alert type="error" message="You must be signed in to proceed" />
          )}
          {error && <Alert type="error" message={error} />}
          <div className="space-y-4 mb-4 w-full">
            <div className="relative">
              <UserCircleIcon className="absolute top-[9px] left-2 h-6 w-6 pointer-events-none" />

              <input
                className="py-2 pl-10 pr-4 w-full bg-gray-800 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                value={username}
                onChange={(e) => {
                  if (e.target.value.length <= 50) setUsername(e.target.value);
                }}
                placeholder="Enter your username"
                required
                maxLength={255}
              />
            </div>
            <div className="relative">
              <LockClosedIcon className="absolute top-[9px] left-2 h-6 w-6 pointer-events-none" />
              <input
                className="py-2 pl-10 pr-4 w-full bg-gray-800 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                value={password}
                onChange={(e) => {
                  if (e.target.value.length <= 50) setPassword(e.target.value);
                }}
                placeholder="Enter your password"
                type="password"
                required
                maxLength={255}
              />
            </div>
          </div>
          <Button
            type="submit"
            isDisabled={!username || !password || loading}
            isLoading={loading}
            color="indigo"
          >
            Login
          </Button>
          <span className="mt-4 text-sm text-center">
            Need an account?{' '}
            <Link className="underline" to="/register">
              Click here to register.
            </Link>
          </span>
        </form>
      </div>
    </>
  );
}
