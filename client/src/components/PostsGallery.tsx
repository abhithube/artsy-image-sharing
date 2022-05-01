import { useQuery } from '@apollo/client';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import { useState } from 'react';
import Button from '../lib/components/Button';
import { POSTS } from '../lib/graphql';
import PreviewImage from './PreviewImage';

type PostsGalleryProps = {
  userId: number;
};

export default function PostsGallery({ userId }: PostsGalleryProps) {
  const [page, setPage] = useState(0);

  const { data, loading } = useQuery(POSTS, {
    variables: {
      userId,
      page,
      limit: 5,
    },
  });

  if (loading) return null;

  return (
    <div className="mt-8">
      <h2 className="mb-4 text-xl font-medium">Posts</h2>
      {data && data.posts.results.length > 0 && (
        <div className="flex items-center space-x-4 p-4 bg-gray-800 rounded-md">
          <Button
            onClick={() => setPage(data.posts.prevPage || 0)}
            isDisabled={data.posts.prevPage === null}
            color="indigo"
          >
            <ChevronLeftIcon className="w-8" aria-label="previous page" />
          </Button>
          <div className="grid grid-cols-5 gap-4 w-full">
            {data.posts.results.map((post: any) => (
              <PreviewImage key={post.id} post={post} />
            ))}
          </div>
          <Button
            onClick={() => setPage(data.posts.nextPage)}
            isDisabled={!data.posts.nextPage}
            color="indigo"
          >
            <ChevronRightIcon className="w-8" aria-label="previous page" />
          </Button>
        </div>
      )}
      {data?.posts.results.length === 0 && (
        <p color="gray.500">No posts to show.</p>
      )}
    </div>
  );
}
