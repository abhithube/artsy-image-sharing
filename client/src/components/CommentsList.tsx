import { Box, Button, Heading, Spinner, Text, VStack } from '@chakra-ui/react';
import { Fragment, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { CommentsQuery, useCommentsQuery } from '../generated/graphql';
import { graphQLClient } from '../graphql/client';
import AddComment from './AddComment';
import CommentItem from './CommentItem';

type CommentsListProp = {
  postId: number;
  commentCount: number;
};

const CommentsList = ({ postId, commentCount }: CommentsListProp) => {
  const [shouldFetch, setShouldFetch] = useState(false);

  const { data, fetchNextPage, hasNextPage, isLoading } =
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
    <Box>
      <AddComment postId={postId} />
      <Heading mb={4}>Comments</Heading>
      <VStack align="stretch" spacing={4} mt={4}>
        {(commentCount > 0 || data?.pages) && (
          <>
            {data?.pages.map((page) =>
              page.comments.results.map((comment) => (
                <Fragment key={comment.id}>
                  <CommentItem comment={comment} />
                </Fragment>
              ))
            )}
            {!data?.pages && (
              <Button onClick={() => setShouldFetch(true)} colorScheme="purple">
                Load Comments
              </Button>
            )}
            {hasNextPage && (
              <Button onClick={() => fetchNextPage()} colorScheme="purple">
                Load More Comments
              </Button>
            )}
          </>
        )}
        {commentCount === 0 && <Text>No comments on this post.</Text>}
        {isLoading && <Spinner speed="1s" />}
      </VStack>
    </Box>
  );
};

export default CommentsList;
