import { Link } from 'react-router-dom';
import { PostSummary } from '../lib/interfaces';

type PreviewImageProps = {
  post: PostSummary;
};

export default function PreviewImage({ post }: PreviewImageProps) {
  return (
    <Link
      className="bg-gray-800 rounded-md overflow-hidden"
      to={`/posts/${post.id}`}
    >
      <img src={post.imageUrl} alt={post.title} />
    </Link>
  );
}
