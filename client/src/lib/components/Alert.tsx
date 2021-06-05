import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/solid';
import classnames from 'classnames';

type AlertProps = {
  type: 'success' | 'error';
  message: string;
};

const Alert = ({ type, message }: AlertProps) => (
  <div
    className={classnames(
      'flex justify-center items-center space-x-2 mb-4 p-1 rounded-sm',
      { 'bg-green-100': type === 'success', 'bg-red-100': type === 'error' }
    )}
  >
    {type === 'error' && (
      <ExclamationCircleIcon className="w-5 h-5 text-red-500" />
    )}
    {type === 'success' && (
      <CheckCircleIcon className="w-5 h-5 text-green-500" />
    )}
    <span
      className={classnames({
        'text-green-500': type === 'success',
        'text-red-500': type === 'error',
      })}
    >
      {message}
    </span>
  </div>
);

export default Alert;
