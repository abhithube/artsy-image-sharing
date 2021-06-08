import { useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import Button from '../lib/components/Button';
import { CommentsQuery, useCommentsQuery } from '../lib/generated/graphql';
import { graphQLClient } from '../lib/graphql/client';
import AddComment from './AddComment';
import CommentItem from './CommentItem';

type CommentsListProp = {
  postId: number;
  commentCount: number;
};

const CommentsList = ({ postId, commentCount }: CommentsListProp) => {
  const [shouldFetch, setShouldFetch] = useState(false);

  const { data, fetchNextPage, hasNextPage, isFetching } =
    useInfiniteQuery<CommentsQuery>(
      ['comments', { postId }],
      (ctx) =>
        graphQLClient.request(useCommentsQuery.document, {
          postId,
          page: ctx.pageParam,
        }),
      {
        getNextPageParam: (lastPage) => lastPage.comments.nextPage,
        enabled: shouldFetch,
      }
    );

  return (
    <div>
      <AddComment postId={postId} />
      <h2 className="mb-4 text-xl font-semibold">Comments</h2>
      <div className="flex flex-col items-stretch space-y-4 mt-4">
        {(commentCount > 0 || data?.pages) && (
          <>
            {data?.pages.map((page) =>
              page.comments.results.map((comment) => (
                <CommentItem key={comment.id} comment={comment} />
              ))
            )}
            {!data?.pages && (
              <Button
                onClick={() => setShouldFetch(true)}
                isDisabled={isFetching}
                isLoading={isFetching}
                color="indigo"
              >
                Load Comments
              </Button>
            )}
            {hasNextPage && (
              <Button
                onClick={() => fetchNextPage()}
                isDisabled={isFetching}
                isLoading={isFetching}
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
};

export default CommentsList;
