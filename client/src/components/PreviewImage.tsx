import { AspectRatio, Link, useColorModeValue } from '@chakra-ui/react';
import { format, quality } from '@cloudinary/base/actions/delivery';
import { fill } from '@cloudinary/base/actions/resize';
import { autoGravity } from '@cloudinary/base/qualifiers/gravity';
import { autoLow } from '@cloudinary/base/qualifiers/quality';
import { lazyload } from '@cloudinary/react';
import { Link as RouterLink } from 'react-router-dom';
import { cld } from '../config/cloudinary';
import { PostSummaryFragment } from '../lib/generated/graphql';
import CloudinaryImage from './CloudinaryImage';

type PreviewImageProps = {
  post: PostSummaryFragment;
};

const PreviewImage = ({ post }: PreviewImageProps) => {
  const cldImg = cld
    .image(post.image.publicId)
    .resize(fill(480, 480).gravity(autoGravity()))
    .quality(quality(autoLow()))
    .delivery(format('auto'));

  return (
    <AspectRatio
      ratio={1}
      w="100%"
      bgColor={useColorModeValue('gray.100', 'gray.900')}
    >
      <Link
        as={RouterLink}
        to={`/posts/${post.id}`}
        mx="auto"
        w="100%"
        h="100%"
      >
        <CloudinaryImage cldImg={cldImg} plugins={[lazyload()]} rounded="md" />
      </Link>
    </AspectRatio>
  );
};

export default PreviewImage;
