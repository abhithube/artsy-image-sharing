import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import { useMemo, useState } from 'react';
import { useQueryClient } from 'react-query';
import Button from '../lib/components/Button';
import {
  PostsDocument,
  PostsFragment,
  usePostsQuery,
} from '../lib/generated/graphql';
import { graphQLClient } from '../lib/graphql/client';
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

  const { data, isLoading } = usePostsQuery(graphQLClient, variables, {
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

  if (isLoading) return null;

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
            {data.posts.results.map((post) => (
              <PreviewImage key={post.id} post={post} />
            ))}
          </div>
          <Button
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            onClick={() => setPage(data.posts.nextPage!)}
            isDisabled={!data.posts.nextPage}
            color="indigo"
          >
            <ChevronRightIcon className="w-8" aria-label="previous page" />
          </Button>
        </div>
      )}
      {data?.posts.results.length === 0 && (
        <p color="gray.500">No favorites to show.</p>
      )}
    </div>
  );
};

export default PostsGallery;
