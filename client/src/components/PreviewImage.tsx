import { Link } from 'react-router-dom';
import { PREVIEW_IMAGE_TRANSFORMATIONS } from '../lib/constants';
import { PostSummaryFragment } from '../lib/generated/graphql';

const { crop, gravity, height, width, quality, format } =
  PREVIEW_IMAGE_TRANSFORMATIONS;

type PreviewImageProps = {
  post: PostSummaryFragment;
};

const PreviewImage = ({ post }: PreviewImageProps) => (
  <Link to={`/posts/${post.id}`}>
    <img
      className="max-w-full max-h-full rounded-md"
      src={`https://res.cloudinary.com/hnisqhgvp/image/upload/c_${crop},g_${gravity},h_${height},w_${width},q_${quality},f_${format}/${post.image.publicId}`}
      alt={post.title}
    />
  </Link>
);

export default PreviewImage;
