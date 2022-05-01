import classnames from 'classnames';

type AvatarProps = {
  url: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  margin?: 'sm' | 'md' | 'lg';
};

export default function Avatar({ url, size = 'md', margin }: AvatarProps) {
  return (
    <div className="rounded-full overflow-hidden">
      <img
        className={classnames(
          {
            'w-8 h-8': size === 'sm',
            'w-12 h-12': size === 'md',
            'w-16 h-16': size === 'lg',
            'w-20 h-20': size === 'xl',
          },
          {
            'mr-2': margin === 'sm',
            'mr-4': margin === 'md',
            'mr-8': margin === 'lg',
          }
        )}
        src={url}
        alt={url}
      />
    </div>
  );
}
