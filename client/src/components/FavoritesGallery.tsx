import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import { useMemo, useState } from 'react';
import { useQueryClient } from 'react-query';
import Button from '../lib/components/Button';
import {
  FavoritesDocument,
  FavoritesFragment,
  useFavoritesQuery,
} from '../lib/generated/graphql';
import { graphQLClient } from '../lib/graphql/client';
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

  const { data, isLoading } = useFavoritesQuery(graphQLClient, variables, {
    initialData: { favorites: initFavorites },
    keepPreviousData: true,
    onSuccess: ({ favorites }) => {
      if (favorites.nextPage) {
        queryClient.prefetchQuery(queryKey, () =>
          graphQLClient.request(FavoritesDocument, {
            ...variables,
            page: favorites.nextPage,
          })
        );
      }
    },
  });

  if (isLoading) return null;

  return (
    <div className="mt-8">
      <h2 className="mb-4 text-xl font-medium">Favorites</h2>
      {data && data.favorites.results.length > 0 && (
        <div className="flex items-center space-x-4 p-4 bg-gray-800 rounded-md">
          <Button
            onClick={() => setPage(data.favorites.prevPage || 0)}
            isDisabled={data.favorites.prevPage === null}
            color="indigo"
          >
            <ChevronLeftIcon className="w-8" aria-label="previous page" />
          </Button>
          <div className="grid grid-cols-5 gap-4 w-full">
            {data.favorites.results.map((favorite) => (
              <PreviewImage key={favorite.id} post={favorite.post} />
            ))}
          </div>
          <Button
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            onClick={() => setPage(data.favorites.nextPage!)}
            isDisabled={data.favorites.nextPage === null}
            color="indigo"
          >
            <ChevronRightIcon className="w-8" aria-label="previous page" />
          </Button>
        </div>
      )}
      {data?.favorites.results.length === 0 && (
        <p color="gray.500">No favorites to show.</p>
      )}
    </div>
  );
};

export default FavoritesGallery;
