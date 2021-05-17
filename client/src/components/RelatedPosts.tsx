import {
  Heading,
  Spinner,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { Fragment } from 'react';
import { graphQLClient } from '../App';
import { useRelatedPostsQuery } from '../generated/graphql';
import PreviewImage from './PreviewImage';

type RelatedPostsProps = {
  postId: number;
};

const RelatedPosts = ({ postId }: RelatedPostsProps) => {
  const { data, isLoading } = useRelatedPostsQuery(graphQLClient, { postId });

  const bgColor = useColorModeValue('gray.100', 'gray.700');

  return (
    <VStack spacing='8' p='8' bgColor={bgColor} rounded='lg'>
      <Heading fontSize='3xl' textAlign='center'>
        More Posts
      </Heading>
      <VStack spacing={4} w='100%'>
        {!isLoading &&
          data?.relatedPosts?.slice(0, 5).map(post => (
            <Fragment key={post.id}>
              <PreviewImage post={post} />
            </Fragment>
          ))}
      </VStack>
      {!isLoading && !data?.relatedPosts && (
        <Text>Posts are not available at this time.</Text>
      )}
      {isLoading && <Spinner />}
    </VStack>
  );
};

export default RelatedPosts;
