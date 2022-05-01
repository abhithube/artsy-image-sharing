import { useLazyQuery } from '@apollo/client';
import Button from '../lib/components/Button';
import { COMMENTS } from '../lib/graphql';
import AddComment from './AddComment';
import CommentItem from './CommentItem';

type CommentsListProp = {
  postId: number;
  commentCount: number;
};

export default function CommentsList({
  postId,
  commentCount,
}: CommentsListProp) {
  const [fetchComments, { data, loading, fetchMore }] = useLazyQuery(COMMENTS);

  return (
    <div>
      <AddComment postId={postId} />
      <h2 className="mb-4 text-xl font-semibold">Comments</h2>
      <div className="flex flex-col items-stretch space-y-4 mt-4">
        {(commentCount > 0 || data?.pages) && (
          <>
            {data?.comments.results.map((comment: any) => (
              <CommentItem key={comment.id} comment={comment} />
            ))}
            {!data?.pages && (
              <Button
                onClick={() =>
                  fetchComments({
                    variables: {
                      postId,
                      limit: 20,
                      page: 0,
                    },
                  })
                }
                isDisabled={loading}
                isLoading={loading}
                color="indigo"
              >
                Load Comments
              </Button>
            )}
            {data.nextPage && (
              <Button
                onClick={() =>
                  fetchMore({
                    variables: {
                      postId,
                      page: data.nextPage,
                      limit: 20,
                    },
                  })
                }
                isDisabled={loading}
                isLoading={loading}
                color="indigo"
              >
                Load More Comments
              </Button>
            )}
          </>
        )}
        {commentCount === 0 && (
          <p className="text-gray-500">No comments on this post.</p>
        )}
      </div>
    </div>
  );
}
