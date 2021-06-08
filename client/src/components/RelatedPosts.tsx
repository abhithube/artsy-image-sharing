import { useRelatedPostsQuery } from '../lib/generated/graphql';
import { graphQLClient } from '../lib/graphql/client';
import PreviewImage from './PreviewImage';

type RelatedPostsProps = {
  postId: number;
};

const RelatedPosts = ({ postId }: RelatedPostsProps) => {
  const { data, isLoading } = useRelatedPostsQuery(graphQLClient, { postId });

  if (isLoading) return null;

  return (
    <div className="p-8 bg-gray-800 rounded-lg">
      <h2 className="mb-4 text-2xl font-semibold text-center">More Posts</h2>
      <div className="flex flex-col space-y-4">
        {data?.relatedPosts?.slice(0, 5).map((post) => (
          <PreviewImage key={post.id} post={post} />
        ))}
      </div>
      {!data && <p>Posts are not available at this time.</p>}
    </div>
  );
};

export default RelatedPosts;
