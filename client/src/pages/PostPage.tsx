import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PostDetails from '../components/PostDetails';
import RelatedPosts from '../components/RelatedPosts';
import { FULL_IMAGE_TRANSFORMATIONS } from '../lib/constants';
import { usePostQuery } from '../lib/generated/graphql';
import { graphQLClient } from '../lib/graphql/client';

const { format, quality } = FULL_IMAGE_TRANSFORMATIONS;

type Params = {
  id: string;
};

const PostPage = () => {
  const { id } = useParams<Params>();

  const { data } = usePostQuery(graphQLClient, { id: Number(id) });

  useEffect(() => window.scrollTo({ top: 0, behavior: 'smooth' }), [id]);

  return (
    <div className="flex items-start space-x-16">
      {data?.post && (
        <>
          <div className="w-3/4">
            <div className="flex justify-center items-center mb-4 h-[75vh] bg-black">
              <img
                className="max-w-full max-h-full"
                src={`https://res.cloudinary.com/hnisqhgvp/image/upload/f_${format},q_${quality}/${data.post.result.image.publicId}`}
                alt={data.post.result.image.publicId}
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
};

export default PostPage;
