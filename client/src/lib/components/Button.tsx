import classnames from 'classnames';

type ButtonProps = {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onBlur?: React.FocusEventHandler<HTMLButtonElement>;
  isDisabled?: boolean;
  isLoading?: boolean;
  color?: 'gray' | 'indigo' | 'red';
};

export default function Button({
  children,
  type = 'button',
  onClick,
  onBlur,
  isDisabled = false,
  isLoading = false,
  color,
}: ButtonProps) {
  return (
    <button
      className={classnames(
        'p-2 disabled:opacity-50 disabled:cursor-default rounded-md shadow-md transition duration-300',
        {
          'bg-gray-700': color === 'gray',
          'bg-indigo-400': color === 'indigo',
          'bg-red-400': color === 'red',
        }
      )}
      // eslint-disable-next-line react/button-has-type
      type={type}
      onClick={onClick}
      onBlur={onBlur}
      disabled={isDisabled}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
}
