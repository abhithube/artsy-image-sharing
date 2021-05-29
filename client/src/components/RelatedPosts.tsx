import {
  Heading,
  Spinner,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { Fragment } from 'react';
import { useRelatedPostsQuery } from '../lib/generated/graphql';
import { graphQLClient } from '../lib/graphql/client';
import PreviewImage from './PreviewImage';

type RelatedPostsProps = {
  postId: number;
};

const RelatedPosts = ({ postId }: RelatedPostsProps) => {
  const { data, isLoading } = useRelatedPostsQuery(graphQLClient, { postId });

  const bgColor = useColorModeValue('gray.100', 'gray.700');

  if (isLoading) return <Spinner speed="1s" />;

  return (
    <VStack spacing={8} p={8} bgColor={bgColor} rounded="lg">
      <Heading fontSize="3xl" textAlign="center">
        More Posts
      </Heading>
      <VStack spacing={4} w="100%">
        {data?.relatedPosts?.slice(0, 5).map((post) => (
          <Fragment key={post.id}>
            <PreviewImage post={post} />
          </Fragment>
        ))}
      </VStack>
      {!data && <Text>Posts are not available at this time.</Text>}
    </VStack>
  );
};

export default RelatedPosts;
