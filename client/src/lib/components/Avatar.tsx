import classnames from 'classnames';
import { AVATAR_TRANSFORMATIONS } from '../constants';
import { ImageFragment } from '../generated/graphql';

type AvatarProps = {
  avatar: ImageFragment;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  margin?: 'sm' | 'md' | 'lg';
};

const { crop, height, width, radius, quality, format } = AVATAR_TRANSFORMATIONS;

const Avatar = ({ avatar, size = 'md', margin }: AvatarProps) => (
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
    src={`https://res.cloudinary.com/hnisqhgvp/image/upload/c_${crop},h_${height},w_${width},r_${radius},q_${quality},f_${format}/${avatar.publicId}`}
    alt={avatar.publicId}
  />
);

export default Avatar;
