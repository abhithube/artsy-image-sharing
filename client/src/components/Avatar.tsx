import { AspectRatio, BoxProps } from '@chakra-ui/react';
import { format, quality } from '@cloudinary/base/actions/delivery';
import { scale } from '@cloudinary/base/actions/resize';
import max from '@cloudinary/base/actions/roundCorners/max';
import { autoLow } from '@cloudinary/base/qualifiers/quality';
import { cld } from '../config/cloudinary';
import { AvatarFragment } from '../lib/generated/graphql';
import CloudinaryImage from './CloudinaryImage';

type AvatarProps = BoxProps & {
  avatar: AvatarFragment;
};

const Avatar = (props: AvatarProps) => {
  const { avatar } = props;

  const cldImg = cld
    .image(avatar.publicId)
    .resize(scale(200, 200))
    .roundCorners(max())
    .quality(quality(autoLow()))
    .delivery(format('auto'));

  return (
    <AspectRatio ratio={1} {...props}>
      <CloudinaryImage cldImg={cldImg} cursor="pointer" />
    </AspectRatio>
  );
};

export default Avatar;
