import Avatar from '../lib/components/Avatar';
import { Comment } from '../lib/interfaces';

type CommentProps = {
  comment: Comment;
};

export default function CommentItem({ comment }: CommentProps) {
  return (
    <div className="flex items-center p-4 bg-gray-800 rounded-lg">
      <Avatar url={comment.user.avatarUrl} size="md" margin="md" />
      <div>
        <div className="flex mb-1">
          <h3 className="mr-4 text-gray-400 font-semibold">
            {comment.user.username}
          </h3>
          <span className="text-gray-500">
            {new Date(comment.createdAt).toLocaleString()}
          </span>
        </div>
        <p>{comment.body}</p>
      </div>
    </div>
  );
}
