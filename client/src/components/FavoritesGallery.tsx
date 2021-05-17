import {
  Box,
  Heading,
  HStack,
  IconButton,
  SimpleGrid,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { Fragment, useMemo, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useQueryClient } from 'react-query';
import { graphQLClient } from '../App';
import {
  FavoritesDocument,
  FavoritesFragment,
  useFavoritesQuery,
} from '../generated/graphql';
import PreviewImage from './PreviewImage';

type FavoritesGalleryProps = {
  userId: number;
  initFavorites: FavoritesFragment;
};

const FavoritesGallery = ({ userId, initFavorites }: FavoritesGalleryProps) => {
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
  const queryKey = useFavoritesQuery.getKey({
    ...variables,
    page: variables.page + 1,
  });

  const { data, isFetching } = useFavoritesQuery(graphQLClient, variables, {
    initialData: { favorites: initFavorites },
    keepPreviousData: true,
    onSuccess: data => {
      if (data.favorites.nextPage) {
        queryClient.prefetchQuery(queryKey, () =>
          graphQLClient.request(FavoritesDocument, {
            ...variables,
            page: data.favorites.nextPage,
          })
        );
      }
    },
  });

  const bgColor = useColorModeValue('gray.100', 'gray.900');

  return (
    <Box mt='8'>
      <Heading fontSize='xl' mb='4'>
        Favorites
      </Heading>
      {data?.favorites && (
        <HStack spacing='4' bgColor={bgColor} p='4' rounded='md'>
          <IconButton
            icon={<FaChevronLeft />}
            onClick={() => setPage(data?.favorites.prevPage || 0)}
            disabled={data?.favorites.prevPage === null}
            aria-label='previous page'
            colorScheme='purple'
          />
          <SimpleGrid columns={5} gap='4' h='25vh' w='100%'>
            {data?.favorites.results.map(favorite => (
              <Fragment key={favorite.id}>
                <PreviewImage post={favorite.post} />
              </Fragment>
            ))}
          </SimpleGrid>
          <IconButton
            icon={<FaChevronRight />}
            onClick={() => {
              const nextPage = data?.favorites.nextPage;
              if (nextPage) setPage(nextPage);
            }}
            disabled={data?.favorites.nextPage === null}
            aria-label='next page'
            colorScheme='purple'
          />
        </HStack>
      )}
      {!data?.favorites && !isFetching && (
        <Text m='4'>No favorites to show.</Text>
      )}
    </Box>
  );
};

export default FavoritesGallery;
