import {
  Button,
  Flex,
  Heading,
  SimpleGrid,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { Fragment } from 'react';
import { useInfiniteQuery } from 'react-query';
import PreviewImage from '../components/PreviewImage';
import { PostsQuery, usePostsQuery } from '../lib/generated/graphql';
import { graphQLClient } from '../lib/graphql/client';

const PostsPage = () => {
  const { data, fetchNextPage, hasNextPage, isLoading } =
    useInfiniteQuery<PostsQuery>(
      'posts',
      (ctx) =>
        graphQLClient.request(usePostsQuery.document, {
          limit: 20,
          page: ctx.pageParam,
        }),
      {
        getNextPageParam: (lastPage) => lastPage.posts.nextPage,
      }
    );

  if (isLoading) return <Spinner speed="1s" />;

  return (
    <Flex direction="column">
      <Heading as="h1" mb={4}>
        Browse All Posts
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4, xl: 5 }} gap={4}>
        {data?.pages.map((page) =>
          page.posts.results.map((post) => (
            <Fragment key={post.id}>
              <PreviewImage post={post} />
            </Fragment>
          ))
        )}
      </SimpleGrid>
      {data?.pages.length === 0 && (
        <Text>Posts are not available at this time.</Text>
      )}
      {hasNextPage && (
        <Button
          onClick={() => fetchNextPage()}
          isLoading={isLoading}
          loadingText="Loading..."
          spinner={<Spinner speed="1s" />}
          mt={4}
          colorScheme="purple"
        >
          Load More Posts
        </Button>
      )}
    </Flex>
  );
};

export default PostsPage;
