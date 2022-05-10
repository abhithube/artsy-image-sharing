import { useMutation } from '@apollo/client';
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
import { Link, useNavigate } from 'react-router-dom';
import Avatar from '../lib/components/Avatar';
import { AuthContext } from '../lib/context';
import { CREATE_FAVORITE, DELETE_FAVORITE } from '../lib/graphql';
import { PostDetails } from '../lib/interfaces';
import CommentsList from './CommentsList';

type PostInfoProps = {
  post: PostDetails;
  isFavorite: boolean;
};

export default function PostInfo({ post, isFavorite }: PostInfoProps) {
  const { authenticatedUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const [createFavorite] = useMutation(CREATE_FAVORITE, {
    update: (cache) => {
      cache.modify({
        fields: {
          post: (existingData) => ({
            ...existingData,
            isFavorite: true,
          }),
        },
      });
    },
  });

  const [deleteFavorite] = useMutation(DELETE_FAVORITE, {
    update: (cache) => {
      cache.modify({
        fields: {
          post: (existingData) => ({
            ...existingData,
            isFavorite: false,
          }),
        },
      });
    },
  });

  const handleFavorite = async () => {
    if (!authenticatedUser) {
      localStorage.setItem('redirect', `/posts/${post.id}`);

      navigate('/login', {
        state: {
          unauthenticated: true,
        },
      });
    } else if (isFavorite) {
      deleteFavorite({
        variables: {
          postId: post.id,
        },
      });
    } else {
      createFavorite({
        variables: {
          postId: post.id,
        },
      });
    }
  };

  return (
    <>
      <div className="flex mb-4">
        <Avatar url={post.user.avatarUrl} size="lg" margin="md" />
        <div className="flex-1 pr-4">
          <h1 className="text-4xl font-semibold">{post.title}</h1>
          <span>
            {`by `}
            <Link className="underline" to={`/users/${post.user?.id}`}>
              {post.user.username}
            </Link>
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <button
            className={classnames(
              'inline-block px-5 py-3 rounded-md shadow-md transition duration-300',
              {
                'bg-indigo-400': isFavorite && authenticatedUser,
                'bg-gray-700': !isFavorite || !authenticatedUser,
              }
            )}
            type="button"
            onClick={handleFavorite}
          >
            <HeartOutlineIcon className="w-5 h-5" />
          </button>
          <a
            className="inline-block px-5 py-3 bg-gray-700 rounded-md shadow-md transition duration-300"
            href={post.imageUrl}
          >
            <DownloadIcon className="w-5 h-5" />
          </a>
        </div>
      </div>
      <div className="flex items-center space-x-2 mb-4">
        <HeartSolidIcon className="w-5 h-5" />
        <span className="pr-2">
          {`${post.favoriteCount} `}
          {post.favoriteCount === 1 ? 'favorite' : 'favorites'}
        </span>
        <ChatAltIcon className="w-5 h-5" />
        <span>
          {`${post.commentCount} `}
          {post.commentCount === 1 ? 'comment' : 'comments'}
        </span>
      </div>
      <div className="mb-8">
        <p className="text-gray-500">{post.body}</p>
        <p className="text-gray-500">
          Published on {new Date(post.createdAt).toDateString()}
        </p>
      </div>
      <CommentsList commentCount={post.commentCount || 0} postId={post.id} />
    </>
  );
}
