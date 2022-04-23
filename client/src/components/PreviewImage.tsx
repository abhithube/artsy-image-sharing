import { Link } from 'react-router-dom';
import { PostSummaryFragment } from '../lib/generated/graphql';

type PreviewImageProps = {
  post: PostSummaryFragment;
};

function PreviewImage({ post }: PreviewImageProps) {
  return (
    <Link
      className="bg-gray-800 rounded-md overflow-hidden"
      to={`/posts/${post.id}`}
    >
      <img src={post.imageUrl} alt={post.title} />
    </Link>
  );
}

export default PreviewImage;
