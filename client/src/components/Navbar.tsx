import { useApolloClient, useMutation } from '@apollo/client';
import { CameraIcon } from '@heroicons/react/solid';
import classnames from 'classnames';
import { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Avatar from '../lib/components/Avatar';
import Button from '../lib/components/Button';
import { AuthContext } from '../lib/context';
import { AUTH, LOGOUT } from '../lib/graphql';

export default function Navbar() {
  const { loading, authenticatedUser, setAuthenticatedUser } =
    useContext(AuthContext);

  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();

  const client = useApolloClient();

  const [logout] = useMutation(LOGOUT, {
    onCompleted: (data) => {
      if (data.isLoggedOut) {
        setAuthenticatedUser(null);

        client.writeQuery({
          query: AUTH,
          data: {
            auth: null,
          },
        });
      }
    },
  });

  return (
    <nav className="fixed top-0 z-10 w-full bg-gray-800 shadow-sm">
      <div className="max-w-[80%] mx-auto flex items-center h-16">
        <div className="flex items-center flex-grow">
          <Link className="mr-8" to="/">
            <div className="flex items-center space-x-2">
              <CameraIcon className="w-8 h-8 text-indigo-400" />
              <span className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-br from-indigo-400 to-indigo-200">
                Artsy
              </span>
            </div>
          </Link>
          <Link className="mr-4" to="/posts">
            Browse
          </Link>
          <Link to="/about">About</Link>
        </div>
        {!loading && authenticatedUser && (
          <div>
            <div className="relative">
              <Button
                onClick={() => setIsOpen((prev) => !prev)}
                onBlur={() => setIsOpen((prev) => !prev)}
              >
                <Avatar url={authenticatedUser.avatarUrl} />
              </Button>
              <div
                className={classnames(
                  'absolute flex flex-col right-0 w-48 border border-gray-600 divide-y divide-gray-600 rounded-md overflow-hidden transition duration-200 ease-in-out transform',
                  { 'opacity-100': isOpen, 'opacity-0': !isOpen },
                  { 'scale-100': isOpen, 'scale-95': !isOpen }
                )}
              >
                <Link
                  className="bg-gray-700 px-4 py-2 hover:bg-gray-600"
                  to="/upload"
                >
                  Upload
                </Link>
                <Link
                  className="bg-gray-700 px-4 py-2 hover:bg-gray-600"
                  to={`/users/${authenticatedUser.id}`}
                >
                  Profile
                </Link>
                <button
                  className="bg-gray-700 px-4 py-2 text-left hover:bg-gray-600"
                  type="button"
                  onClick={() => logout()}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
        {!loading && !authenticatedUser && (
          <Link
            to="/login"
            onClick={() => {
              if (
                location.pathname !== '/login' &&
                location.pathname !== '/register'
              )
                localStorage.setItem('redirect', location.pathname);
            }}
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
