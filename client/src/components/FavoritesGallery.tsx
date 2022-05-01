import { useQuery } from '@apollo/client';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import { useState } from 'react';
import Button from '../lib/components/Button';
import { FAVORITES } from '../lib/graphql';
import PreviewImage from './PreviewImage';

type FavoritesGalleryProps = {
  userId: number;
};

export default function FavoritesGallery({ userId }: FavoritesGalleryProps) {
  const [page, setPage] = useState(0);

  const { data, loading } = useQuery(FAVORITES, {
    variables: {
      userId,
      page,
      limit: 5,
    },
  });

  if (loading) return null;

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
            {data.favorites.results.map((favorite: any) => (
              <PreviewImage key={favorite.id} post={favorite.post} />
            ))}
          </div>
          <Button
            onClick={() => setPage(data.favorites.nextPage)}
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
}
