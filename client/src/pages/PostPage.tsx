import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PostDetails from '../components/PostDetails';
import RelatedPosts from '../components/RelatedPosts';
import { usePostQuery } from '../lib/generated/graphql';
import { graphQLClient } from '../lib/graphql/client';

type Params = {
  id: string;
};

function PostPage() {
  const { id } = useParams<Params>();

  const { data, isLoading } = usePostQuery(graphQLClient, { id: Number(id) });

  useEffect(() => window.scrollTo({ top: 0, behavior: 'smooth' }), [id]);

  if (isLoading) return null;

  return (
    <div className="flex items-start space-x-16">
      {data?.post && (
        <>
          <div className="w-3/4">
            <div className="flex justify-center items-center mb-4 h-[75vh] bg-black">
              <img
                className="max-w-full max-h-full"
                src={data.post.result.imageUrl
                  .replace('/images', '/images/original')
                  .replace(
                    '.webp',
                    `.${data.post.result.title.split('.').pop()}`
                  )}
                alt={data.post.result.title}
              />
            </div>
            <PostDetails
              post={data.post.result}
              isFavorite={data.post.isFavorite}
            />
          </div>
          <div className="w-1/4">
            <RelatedPosts postId={Number(id)} />
          </div>
        </>
      )}
      {!data?.post && <p>Post not found</p>}
    </div>
  );
}

export default PostPage;
