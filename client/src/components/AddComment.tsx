import { useMutation } from '@apollo/client';
import { FormEvent, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../lib/components/Button';
import { AuthContext } from '../lib/context';
import { CREATE_COMMENT } from '../lib/graphql';

type AddCommentProps = {
  postId: number;
};

export default function AddComment({ postId }: AddCommentProps) {
  const { authenticatedUser } = useContext(AuthContext);

  const [comment, setComment] = useState('');

  const navigate = useNavigate();

  const [createComment, { loading }] = useMutation(CREATE_COMMENT, {
    update: (cache, { data }) => {
      cache.modify({
        fields: {
          comments: (existing) => ({
            ...existing,
            results: [data.comment, ...existing.results],
          }),
        },
      });
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!authenticatedUser) {
      localStorage.setItem('redirect', `/posts/${postId}`);
      navigate('/login', {
        state: {
          unauthenticated: true,
        },
      });
    } else {
      createComment({
        variables: {
          body: comment,
          postId,
        },
      });
    }
  };

  return (
    <form className="flex flex-col items-end" onSubmit={handleSubmit}>
      <textarea
        className="mb-2 p-4 rounded-md w-full bg-gray-800 border border-gray-500 resize-none"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
        rows={2}
        maxLength={500}
        placeholder="Leave a comment..."
      />
      <div className="space-x-4">
        <Button
          type="submit"
          isDisabled={comment.length === 0 || loading}
          isLoading={loading}
          color="indigo"
        >
          Submit
        </Button>
        <Button
          onClick={() => setComment('')}
          isDisabled={comment.length === 0}
          color="red"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
