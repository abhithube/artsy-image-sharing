import { Box, Button, Heading, Spinner, Text, VStack } from '@chakra-ui/react';
import { Fragment, useEffect, useState } from 'react';
import { graphQLClient } from '../App';
import { CommentFragment, useCommentsQuery } from '../generated/graphql';
import AddComment from './AddComment';
import CommentItem from './CommentItem';

type CommentsListProp = {
  postId: number;
  commentCount: number;
  setCommentCount: React.Dispatch<React.SetStateAction<number>>;
};

const CommentsList = ({
  postId,
  commentCount,
  setCommentCount,
}: CommentsListProp) => {
  const [shouldFetch, setShouldFetch] = useState(false);

  const { data, isLoading } = useCommentsQuery(
    graphQLClient,
    {
      postId,
      limit: commentCount,
    },
    { enabled: shouldFetch, onSuccess: () => setShouldFetch(false) }
  );

  const [comments, setComments] = useState<CommentFragment[]>([]);

  const addComment = (comment: CommentFragment) => {
    setComments(prev => [comment, ...prev]);
    setCommentCount(prev => prev + 1);
    setShouldFetch(true);
  };

  useEffect(() => setComments(data?.comments.results || []), [data]);

  return (
    <Box>
      <AddComment postId={postId} addComment={addComment} />
      <Heading mb='4'>Comments</Heading>
      <VStack align='stretch' spacing='4' mt='4'>
        {!isLoading && commentCount > 0 && (
          <>
            {comments.map(comment => (
              <Fragment key={comment.id}>
                <CommentItem comment={comment} />
              </Fragment>
            ))}
            {comments.length < commentCount && (
              <Button onClick={() => setShouldFetch(true)} colorScheme='purple'>
                Load All Comments
              </Button>
            )}
          </>
        )}
        {!isLoading && commentCount === 0 && (
          <Text>No comments on this post.</Text>
        )}
        {isLoading && <Spinner />}
      </VStack>
    </Box>
  );
};

export default CommentsList;
