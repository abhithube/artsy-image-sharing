import {
  Button,
  Flex,
  Heading,
  SimpleGrid,
  Spinner,
  Text,
  useToast,
} from '@chakra-ui/react';
import { Fragment, useEffect } from 'react';
import { useInfiniteQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import PreviewImage from '../components/PreviewImage';
import { PostsQuery, usePostsQuery } from '../lib/generated/graphql';
import { graphQLClient } from '../lib/graphql/client';

type Uploaded = Location & {
  uploaded?: boolean;
};

const PostsPage = () => {
  const location = useLocation<Uploaded>();

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

  const toast = useToast();

  useEffect(() => {
    if (location.state?.uploaded) {
      toast({
        status: 'success',
        title: 'Created post successfully',
        isClosable: true,
      });

      location.state.uploaded = false;
    }

    return () => toast.closeAll();
  }, [location.state, toast]);

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
