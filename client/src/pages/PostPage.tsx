import {
  Box,
  Center,
  Flex,
  Image,
  Skeleton,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostDetails from '../components/PostDetails';
import RelatedPosts from '../components/RelatedPosts';
import { usePostQuery } from '../generated/graphql';
import { graphQLClient } from '../graphql/client';

type Params = {
  id: string;
};

const PostPage = () => {
  const { id } = useParams<Params>();

  const { data, isLoading } = usePostQuery(graphQLClient, { id: Number(id) });

  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => window.scrollTo({ top: 0, behavior: 'smooth' }), [id]);

  if (isLoading) return <Spinner speed="1s" />;

  return (
    <Flex align="flex-start">
      {data?.post && (
        <>
          <Box
            flexBasis={['100%', '100%', '100%', '75%', '75%']}
            pr={[null, null, null, 16, 16]}
          >
            <Center h="72vh" mb={4} bgColor="black">
              <Skeleton isLoaded={imageLoaded} w="100%" h="100%">
                <Image
                  src={`https://res.cloudinary.com/athube/image/upload/q_auto:eco/${
                    data.post.result.imageUrl.split('upload/')[1]
                  }`}
                  alt={data?.post?.result.title}
                  onLoad={() => setImageLoaded(true)}
                  h="100%"
                  w="100%"
                  objectFit="contain"
                />
              </Skeleton>
            </Center>
            <PostDetails
              post={data.post.result}
              isFavorite={data.post.isFavorite}
            />
          </Box>
          <Box
            flexBasis={['0%', '0%', '0%', '25%', '25%']}
            display={['none', 'none', 'none', 'block', 'block']}
          >
            <RelatedPosts postId={Number(id)} />
          </Box>
        </>
      )}
      {!data?.post && <Text>Post not found</Text>}
    </Flex>
  );
};

export default PostPage;
