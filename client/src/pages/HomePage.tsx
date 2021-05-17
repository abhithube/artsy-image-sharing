import { Box, Heading, SimpleGrid } from '@chakra-ui/react';
import { Fragment } from 'react';
import { graphQLClient } from '../App';
import PreviewImage from '../components/PreviewImage';
import {
  PostSortField,
  SortDirection,
  usePostsQuery,
} from '../generated/graphql';

const HomePage = () => {
  const { data, isLoading } = usePostsQuery(graphQLClient, {
    field: PostSortField.FavoriteCount,
    direction: SortDirection.Asc,
    limit: 20,
  });

  return (
    <Box>
      <Heading as='h1' mb='4'>
        Featured
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4, xl: 5 }} gap='4'>
        {!isLoading &&
          data?.posts.results?.map(post => (
            <Fragment key={post.id}>
              <PreviewImage post={post} />
            </Fragment>
          ))}
      </SimpleGrid>
      {!isLoading && data?.posts.results?.length === 0 && (
        <Box>Posts are not available at this time.</Box>
      )}
    </Box>
  );
};

export default HomePage;
