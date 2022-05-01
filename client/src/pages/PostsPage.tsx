import { useQuery } from '@apollo/client';
import PreviewImage from '../components/PreviewImage';
import Button from '../lib/components/Button';
import { POSTS } from '../lib/graphql';

export default function PostsPage() {
  const { data, loading, fetchMore } = useQuery(POSTS, {
    variables: {
      page: 0,
      limit: 20,
    },
  });

  return (
    <div className="flex flex-col space-y-4">
      <h1 className="text-2xl font-semibold">Browse All Posts</h1>
      <div className="grid grid-cols-5 gap-4">
        {data?.posts.results.map((post: any) => (
          <PreviewImage key={post.id} post={post} />
        ))}
      </div>
      {data?.posts.results.length === 0 && (
        <p>Posts are not available at this time.</p>
      )}
      {data?.nextPage && (
        <Button
          onClick={() =>
            fetchMore({
              variables: {
                page: data.nextPage,
                limit: 20,
              },
            })
          }
          isDisabled={loading}
          isLoading={loading}
          color="indigo"
        >
          Load More Posts
        </Button>
      )}
    </div>
  );
}
