import { useQuery } from '@apollo/client';
import FeaturedHero from '../components/FeaturedHero';
import FeaturedPost from '../components/FeaturedPost';
import { FEATURED } from '../lib/graphql';
import {
  FeaturedResponse,
  FeaturedVars,
  PostSortField,
  SortDirection,
} from '../lib/types';

export default function HomePage() {
  const { data, loading } = useQuery<FeaturedResponse, FeaturedVars>(FEATURED, {
    variables: {
      field: PostSortField.FavoriteCount,
      direction: SortDirection.Desc,
      limit: 5,
    },
  });

  if (loading) return null;

  return (
    <div>
      <h1 className="mb-8 py-2 text-6xl font-bold">
        Welcome to{' '}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-indigo-200">
          Artsy!
        </span>
      </h1>
      {data && data?.posts.results.length > 0 && (
        <>
          <FeaturedHero featuredPost={data.posts.results[0]} />
          <h2 className="mb-4 text-2xl font-semibold">More Posts</h2>
          <div className="grid grid-cols-4 gap-4">
            {data?.posts.results.slice(1).map((post) => (
              <FeaturedPost key={post.id} post={post} />
            ))}
          </div>
        </>
      )}
      {data?.posts.results.length === 0 && (
        <p>Posts are not available at this time.</p>
      )}
    </div>
  );
}
