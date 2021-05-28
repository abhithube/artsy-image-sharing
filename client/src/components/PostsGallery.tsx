import {
  Box,
  Heading,
  HStack,
  Icon,
  IconButton,
  SimpleGrid,
  Spinner,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { Fragment, useMemo, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useQueryClient } from 'react-query';
import {
  PostsDocument,
  PostsFragment,
  usePostsQuery,
} from '../generated/graphql';
import { graphQLClient } from '../graphql/client';
import PreviewImage from './PreviewImage';

type PostsGalleryProps = {
  userId: number;
  initPosts: PostsFragment;
};

const PostsGallery = ({ userId, initPosts }: PostsGalleryProps) => {
  const [page, setPage] = useState(0);

  const variables = useMemo(
    () => ({
      userId,
      limit: 5,
      page,
    }),
    [page, userId]
  );

  const queryClient = useQueryClient();
  const queryKey = usePostsQuery.getKey({
    ...variables,
    page: variables.page + 1,
  });

  const { data, isFetching } = usePostsQuery(graphQLClient, variables, {
    initialData: { posts: initPosts },
    keepPreviousData: true,
    onSuccess: ({ posts }) => {
      if (posts.nextPage) {
        queryClient.prefetchQuery(queryKey, () =>
          graphQLClient.request(PostsDocument, {
            ...variables,
            page: posts.nextPage,
          })
        );
      }
    },
  });

  const bgColor = useColorModeValue('gray.100', 'gray.900');

  if (isFetching && !data) return <Spinner speed="1s" />;

  return (
    <Box mt={8}>
      <Heading fontSize="2xl" mb={4}>
        Posts
      </Heading>
      {data && data.posts.results.length > 0 && (
        <HStack spacing={4} bgColor={bgColor} p="4" rounded="md">
          <IconButton
            icon={<Icon as={FaChevronLeft} />}
            onClick={() => setPage(data.posts.prevPage || 0)}
            disabled={data.posts.prevPage === null}
            aria-label="previous page"
            colorScheme="purple"
          />
          <SimpleGrid columns={5} gap={4} w="100%">
            {data.posts.results.map((post) => (
              <Fragment key={post.id}>
                <PreviewImage post={post} />
              </Fragment>
            ))}
          </SimpleGrid>
          <IconButton
            icon={<Icon as={FaChevronRight} />}
            onClick={() => {
              if (data.posts.nextPage) setPage(data.posts.nextPage);
            }}
            disabled={data?.posts.nextPage === null}
            aria-label="next page"
            colorScheme="purple"
          />
        </HStack>
      )}
      {data?.posts.results.length === 0 && (
        <Text color="gray.500">No posts to show.</Text>
      )}
    </Box>
  );
};

export default PostsGallery;
