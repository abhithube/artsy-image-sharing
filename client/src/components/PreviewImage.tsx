import {
  AspectRatio,
  Image,
  Link,
  Skeleton,
  useColorModeValue,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { PostSummaryFragment } from '../generated/graphql';
import { CLOUDINARY_URL } from '../lib/constants';

type PreviewImageProps = {
  post: PostSummaryFragment;
};

const PreviewImage = ({ post }: PreviewImageProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <AspectRatio ratio={1} w="100%">
      <Skeleton
        isLoaded={loaded}
        rounded="md"
        overflow="hidden"
        startColor={useColorModeValue('gray.300', 'gray.700')}
        endColor={useColorModeValue('gray.200', 'gray.600')}
      >
        <Link
          as={RouterLink}
          to={`/posts/${post.id}`}
          mx="auto"
          w="100%"
          h="100%"
        >
          <Image
            src={`${CLOUDINARY_URL}/ar_1,c_fill,f_jpg,g_auto,q_auto:eco,w_480/${
              post.imageUrl.split('upload/')[1]
            }`}
            alt={post.title}
            htmlWidth={480}
            htmlHeight={480}
            objectFit="cover"
            w="100%"
            h="100%"
            loading="lazy"
            visibility={loaded ? 'visible' : 'hidden'}
            onLoad={() => setLoaded(true)}
          />
        </Link>
      </Skeleton>
    </AspectRatio>
  );
};

export default PreviewImage;
