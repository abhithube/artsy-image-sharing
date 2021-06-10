// TODO
import { ChatAltIcon, HeartIcon } from '@heroicons/react/solid';
import { Link } from 'react-router-dom';
import Avatar from '../lib/components/Avatar';
import Button from '../lib/components/Button';
import { PostDetailsFragment } from '../lib/generated/graphql';
import PreviewImage from './PreviewImage';

type FeaturedHeroProps = {
  featuredPost: PostDetailsFragment;
};

const FeaturedHero = ({ featuredPost }: FeaturedHeroProps) => (
  <div className="flex justify-center items-center space-x-12 mb-8 p-8 h-[50vh] bg-gray-800">
    <div className="flex flex-col items-center space-y-4 w-1/3">
      <h2 className="text-4xl font-semibold">Featured Post</h2>
      <p className="text-center">
        Upload an image for a chance to be featured here on the home page!
        Create an account or log in to get started!
      </p>
    </div>
    <div className="flex justify-evenly items-center py-4 w-2/3">
      <div>
        <PreviewImage post={featuredPost} />
      </div>
      <div className="space-y-8">
        <div className="p-6 space-y-4 w-full bg-gray-900 rounded-lg">
          <h3 className="text-3xl line-clamp-1">{featuredPost.title}</h3>
          <div className="flex space-x-4">
            <div className="flex items-center">
              <HeartIcon className="mr-2 w-5" />
              <span className="line-clamp-1">
                {`${featuredPost.favoriteCount} `}
                {featuredPost.favoriteCount === 1 ? 'favorite' : 'favorites'}
              </span>
            </div>
            <div className="flex items-center">
              <ChatAltIcon className="mr-2 w-5" />
              <span className="line-clamp-1">
                {`${featuredPost.commentCount} `}
                {featuredPost.commentCount === 1 ? 'comment' : 'comments'}
              </span>
            </div>
          </div>
          <Button color="indigo">
            <Link to={`posts/${featuredPost.id}`}>Go to Post</Link>
          </Button>
        </div>
        <div className="p-6 space-y-4 w-full bg-gray-900 rounded-lg">
          <div className="flex items-center">
            <Avatar avatar={featuredPost.user.avatar} margin="md" />
            <span>{featuredPost.user.username}</span>
          </div>
          <Button color="indigo">
            <Link to={`/users/${featuredPost.user?.id}`}>Go to Profile</Link>
          </Button>
        </div>
      </div>
    </div>
  </div>
);

export default FeaturedHero;
