import { Box, Center, Flex, Image, Skeleton, Spinner } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router';
import { graphQLClient } from '../App';
import PostDetails from '../components/PostDetails';
import RelatedPosts from '../components/RelatedPosts';
import { Post, usePostQuery } from '../generated/graphql';

type Params = {
  id: string;
};

const PostPage = () => {
  const { id } = useParams<Params>();

  const { data, isLoading } = usePostQuery(graphQLClient, { id: Number(id) });

  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => window.scrollTo({ top: 0, behavior: 'smooth' }), [id]);

  return (
    <Flex align='flex-start'>
      {!isLoading && data?.post && (
        <>
          <Box
            flexBasis={['100%', '100%', '100%', '75%', '75%']}
            pr={[null, null, null, '16', '16']}
          >
            <Center h='72vh' mb='4' bgColor='black'>
              <Skeleton isLoaded={imageLoaded} w='100%' h='100%'>
                <Image
                  src={`https://res.cloudinary.com/athube/image/upload/q_auto:eco/${
                    data.post.result.imageUrl.split('upload/')[1]
                  }`}
                  alt={data?.post?.result.title}
                  onLoad={() => setImageLoaded(true)}
                  h='100%'
                  w='100%'
                  objectFit='contain'
                />
              </Skeleton>
            </Center>
            <PostDetails
              post={data.post.result as Post}
              isFavorite={data.post.isFavorite!}
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
      {!isLoading && !data?.post && <Redirect to='/404' />}
      {isLoading && <Spinner />}
    </Flex>
  );
};

export default PostPage;
