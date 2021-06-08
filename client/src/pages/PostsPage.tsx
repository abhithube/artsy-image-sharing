import { useInfiniteQuery } from 'react-query';
import PreviewImage from '../components/PreviewImage';
import Button from '../lib/components/Button';
import { PostsQuery, usePostsQuery } from '../lib/generated/graphql';
import { graphQLClient } from '../lib/graphql/client';

const PostsPage = () => {
  const { data, fetchNextPage, hasNextPage, isFetching } =
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

  return (
    <div className="flex flex-col space-y-4">
      <h1 className="text-2xl font-semibold">Browse All Posts</h1>
      <div className="grid grid-cols-5 gap-4">
        {data?.pages.map((page) =>
          page.posts.results.map((post) => (
            <PreviewImage key={post.id} post={post} />
          ))
        )}
      </div>
      {data?.pages.length === 0 && <p>Posts are not available at this time.</p>}
      {hasNextPage && (
        <Button
          onClick={() => fetchNextPage()}
          isDisabled={isFetching}
          isLoading={isFetching}
          color="indigo"
        >
          Load More Posts
        </Button>
      )}
    </div>
  );
};

export default PostsPage;
