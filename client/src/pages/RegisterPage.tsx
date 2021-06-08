import {
  ExclamationCircleIcon,
  LockClosedIcon,
  UserCircleIcon,
} from '@heroicons/react/solid';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Button from '../lib/components/Button';
import { useRegisterMutation } from '../lib/generated/graphql';
import { graphQLClient } from '../lib/graphql/client';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const history = useHistory();

  const mutation = useRegisterMutation(graphQLClient, {
    onSuccess: (data) => {
      if (data.registered) history.push('/login', { registered: true });
    },
    onError: () => {
      setLoading(false);
      setError('Username already taken');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== passwordConfirm) setError('Passwords do not match');
    else {
      setLoading(true);
      mutation.mutate({ username, password });
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-semibold mb-4">Register</h1>
      <form
        className="flex flex-col p-8 w-[400px] bg-gray-800 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        {error && (
          <div className="flex justify-center items-center space-x-2 mb-4 p-1 bg-red-200 rounded-sm">
            <ExclamationCircleIcon className="w-5 h-5 text-red-500" />
            <span className="text-red-500">{error}</span>
          </div>
        )}
        <div className="space-y-4 mb-4 w-full">
          <div className="relative">
            <UserCircleIcon className="absolute top-[9px] left-2 h-6 w-6 pointer-events-none" />
            <input
              className="py-2 pl-10 pr-4 w-full bg-gray-800 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={username}
              onChange={(e) => {
                if (e.target.value.length <= 50) setUsername(e.target.value);
              }}
              placeholder="Enter your username..."
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
              placeholder="Enter your password..."
              type="password"
              required
              maxLength={255}
            />
          </div>
          <div className="relative">
            <LockClosedIcon className="absolute top-[9px] left-2 h-6 w-6 pointer-events-none" />

            <input
              className="py-2 pl-10 pr-4 w-full bg-gray-800 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={passwordConfirm}
              onChange={(e) => {
                if (e.target.value.length <= 50)
                  setPasswordConfirm(e.target.value);
              }}
              placeholder="Confirm your password..."
              type="password"
              required
              maxLength={255}
            />
          </div>
        </div>
        <Button
          type="submit"
          isDisabled={!username || !password || !passwordConfirm || loading}
          isLoading={loading}
          color="indigo"
        >
          Register
        </Button>
        <span className="mt-4 text-sm text-center">
          Already registered?{' '}
          <Link className="underline" to="/login">
            Click here to login.
          </Link>
        </span>
      </form>
    </div>
  );
};

export default RegisterPage;
