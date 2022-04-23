import { ChatAltIcon, HeartIcon } from '@heroicons/react/solid';
import { Link } from 'react-router-dom';
import Avatar from '../lib/components/Avatar';
import { PostDetailsFragment } from '../lib/generated/graphql';
import PreviewImage from './PreviewImage';

type FeaturedPostProps = {
  post: PostDetailsFragment;
};

function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <div className="space-y-4 p-4 bg-gray-800 rounded-lg">
      <PreviewImage post={post} />
      <div className="flex justify-start items-center">
        <Avatar url={post.user.avatarUrl} margin="md" />
        <div>
          <h3 className="text-lg line-clamp-1">
            <Link to={`posts/${post.id}`}>{post.title}</Link>
          </h3>
          <p className="text-gray-500 line-clamp-1">{`by ${post.user.username}`}</p>
        </div>
      </div>
      <div className="flex space-x-4">
        <div className="flex items-center">
          <HeartIcon className="inline mr-2 w-5" />
          <span>{`${post.favoriteCount} `}</span>
        </div>
        <div className="flex items-center">
          <ChatAltIcon className="inline mr-2 w-5" />
          <span>{`${post.commentCount} `}</span>
        </div>
      </div>
    </div>
  );
}

export default FeaturedPost;
