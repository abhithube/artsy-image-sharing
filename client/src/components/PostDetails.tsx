import {
  DownloadIcon,
  HeartIcon as HeartOutlineIcon,
} from '@heroicons/react/outline';
import {
  ChatAltIcon,
  HeartIcon as HeartSolidIcon,
} from '@heroicons/react/solid';
import classnames from 'classnames';
import { useContext } from 'react';
import { useQueryClient } from 'react-query';
import { Link, useHistory } from 'react-router-dom';
import Avatar from '../lib/components/Avatar';
import { FULL_IMAGE_TRANSFORMATIONS } from '../lib/constants';
import { AuthContext } from '../lib/context/AuthContext';
import {
  PostQuery,
  useCreateFavoriteMutation,
  useDeleteFavoriteMutation,
  usePostQuery,
} from '../lib/generated/graphql';
import { graphQLClient } from '../lib/graphql/client';
import CommentsList from './CommentsList';

const { flag } = FULL_IMAGE_TRANSFORMATIONS;

type PostDetailsProps = {
  id: number;
};

const PostDetails = ({ id }: PostDetailsProps) => {
  const { authenticatedUser } = useContext(AuthContext);

  const history = useHistory();

  const queryClient = useQueryClient();
  const queryKey = usePostQuery.getKey({ id });

  const { data } = usePostQuery(graphQLClient, { id: Number(id) });

  const handleSuccess = () => queryClient.fetchQuery(queryKey);

  const updateFavorited = (favorited: boolean) => {
    const data2 = queryClient.getQueryData<PostQuery>(queryKey);

    if (data2?.post) {
      queryClient.setQueryData<PostQuery>(queryKey, {
        post: { ...data2.post, isFavorite: favorited },
      });
    }
  };

  const createMutation = useCreateFavoriteMutation(graphQLClient, {
    onMutate: () => updateFavorited(true),
    onSuccess: handleSuccess,
    onError: () => updateFavorited(false),
  });
  const deleteMutation = useDeleteFavoriteMutation(graphQLClient, {
    onMutate: () => updateFavorited(false),
    onSuccess: handleSuccess,
    onError: () => updateFavorited(true),
  });

  const handleFavorite = async () => {
    if (!authenticatedUser) {
      localStorage.setItem('redirect', `/posts/${id}`);
      history.push('/login', { unauthenticated: true });
    } else if (data?.post?.isFavorite) deleteMutation.mutate({ postId: id });
    else createMutation.mutate({ postId: id });
  };

  return (
    <>
      {data?.post && (
        <>
          <div className="flex mb-4">
            <Avatar
              avatar={data.post.result.user.avatar}
              size="lg"
              margin="md"
            />
            <div className="flex-1 pr-4">
              <h1 className="text-4xl font-semibold">
                {data.post.result.title}
              </h1>
              <span>
                {`by `}
                <Link
                  className="underline"
                  to={`/users/${data.post.result.user?.id}`}
                >
                  {data.post.result.user.username}
                </Link>
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                className={classnames(
                  'inline-block px-5 py-3 rounded-md shadow-md transition duration-300',
                  {
                    'bg-indigo-400': data.post.isFavorite && authenticatedUser,
                    'bg-gray-700': !data.post.isFavorite || !authenticatedUser,
                  }
                )}
                type="button"
                onClick={handleFavorite}
              >
                <HeartOutlineIcon className="w-5 h-5" />
              </button>
              <a
                className="inline-block px-5 py-3 bg-gray-700 rounded-md shadow-md transition duration-300"
                href={`https://res.cloudinary.com/hnisqhgvp/image/upload/fl_${flag}/${data.post.result.image.publicId}`}
              >
                <DownloadIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div className="flex items-center space-x-2 mb-4">
            <HeartSolidIcon className="w-5 h-5" />
            <span className="pr-2">
              {`${data.post.result.favoriteCount} `}
              {data.post.result.favoriteCount === 1 ? 'favorite' : 'favorites'}
            </span>
            <ChatAltIcon className="w-5 h-5" />
            <span>
              {`${data.post.result.commentCount} `}
              {data.post.result.commentCount === 1 ? 'comment' : 'comments'}
            </span>
          </div>
          <div className="mb-8">
            <p className="text-gray-500">{data.post.result.body}</p>
            <p className="text-gray-500">
              Published on {new Date(data.post.result.createdAt).toDateString()}
            </p>
          </div>
          <CommentsList
            commentCount={data.post.result.commentCount || 0}
            postId={id}
          />
        </>
      )}
    </>
  );
};

export default PostDetails;
