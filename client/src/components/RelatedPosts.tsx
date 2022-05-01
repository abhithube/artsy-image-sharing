import { useQuery } from '@apollo/client';
import { RELATED_POSTS } from '../lib/graphql';
import PreviewImage from './PreviewImage';

type RelatedPostsProps = {
  postId: number;
};

export default function RelatedPosts({ postId }: RelatedPostsProps) {
  const { data, loading } = useQuery(RELATED_POSTS, {
    variables: {
      postId,
    },
  });

  if (loading) return null;

  return (
    <div className="p-8 bg-gray-800 rounded-lg">
      <h2 className="mb-4 text-2xl font-semibold text-center">More Posts</h2>
      <div className="flex flex-col space-y-4">
        {data?.relatedPosts?.slice(0, 5).map((post: any) => (
          <PreviewImage key={post.id} post={post} />
        ))}
      </div>
      {!data && <p>Posts are not available at this time.</p>}
    </div>
  );
}
