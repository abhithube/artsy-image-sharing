import {
  Box,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Spinner,
} from '@chakra-ui/react';
import { Fragment } from 'react';
import { IoMdImages } from 'react-icons/io';
import FeaturedHero from '../components/FeaturedHero';
import FeaturedPost from '../components/FeaturedPost';
import {
  PostSortField,
  SortDirection,
  useFeaturedQuery,
} from '../lib/generated/graphql';
import { graphQLClient } from '../lib/graphql/client';

const HomePage = () => {
  const { data, isLoading } = useFeaturedQuery(graphQLClient, {
    field: PostSortField.FavoriteCount,
    direction: SortDirection.Desc,
    limit: 5,
  });

  if (isLoading) return <Spinner speed="1s" />;

  return (
    <Box>
      <HStack spacing={8} mb={8}>
        <Heading as="h1" fontSize="6xl">
          Welcome to Artsy
        </Heading>
        <Icon as={IoMdImages} fontSize="8xl" />
      </HStack>
      {data && data?.posts.results.length > 0 && (
        <>
          <FeaturedHero featuredPost={data.posts.results[0]} />
          <Heading mb={4}>More Posts</Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4, xl: 4 }} gap={4}>
            {data?.posts.results.slice(1).map((post) => (
              <Fragment key={post.id}>
                <FeaturedPost post={post} />
              </Fragment>
            ))}
          </SimpleGrid>
        </>
      )}
      {data?.posts.results.length === 0 && (
        <Box>Posts are not available at this time.</Box>
      )}
    </Box>
  );
};

export default HomePage;
