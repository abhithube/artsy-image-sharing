import { FormEvent, useContext, useState } from 'react';
import { InfiniteData, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import Button from '../lib/components/Button';
import { AuthContext } from '../lib/context/AuthContext';
import {
  CommentsQuery,
  useCommentsQuery,
  useCreateCommentMutation,
  usePostQuery,
} from '../lib/generated/graphql';
import { graphQLClient } from '../lib/graphql/client';

type AddCommentProps = {
  postId: number;
};

function AddComment({ postId }: AddCommentProps) {
  const { authenticatedUser } = useContext(AuthContext);

  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const commentsQueryKey = useCommentsQuery.getKey({ postId });
  const postQueryKey = usePostQuery.getKey({ id: postId });

  const mutation = useCreateCommentMutation(graphQLClient, {
    onMutate: () => {
      const data =
        queryClient.getQueryData<InfiniteData<CommentsQuery>>(commentsQueryKey);

      if (!authenticatedUser || !data) return;

      const optimisticUpdate = {
        id: 0,
        body: comment,
        createdAt: new Date(),
        user: {
          id: authenticatedUser.id,
          username: authenticatedUser.username,
          avatarUrl: authenticatedUser.avatarUrl,
        },
      };

      data.pages[0].comments.results = [
        optimisticUpdate,
        ...data.pages[0].comments.results,
      ];

      queryClient.setQueryData<InfiniteData<CommentsQuery>>(
        commentsQueryKey,
        (d) => {
          if (d)
            return {
              pages: data.pages,
              pageParams: d?.pageParams,
            };
          return { pages: [], pageParams: [] };
        }
      );
    },
    onSuccess: () => {
      setComment('');
      setLoading(false);

      queryClient.fetchInfiniteQuery(commentsQueryKey);
      queryClient.fetchQuery(postQueryKey);
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!authenticatedUser) {
      localStorage.setItem('redirect', `/posts/${postId}`);
      navigate('/login', { state: { unauthenticated: true } });
    } else {
      setLoading(true);
      mutation.mutate({ body: comment, postId });
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

export default AddComment;
