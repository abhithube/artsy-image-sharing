import {
  Button,
  ButtonGroup,
  Flex,
  Textarea,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { FormEvent, useContext, useEffect, useState } from 'react';
import { InfiniteData, useQueryClient } from 'react-query';
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

const AddComment = ({ postId }: AddCommentProps) => {
  const { authenticatedUser } = useContext(AuthContext);

  const [comment, setComment] = useState('');

  const toast = useToast();

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
          avatar: authenticatedUser.avatar,
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

      queryClient.fetchInfiniteQuery(commentsQueryKey);
      queryClient.fetchQuery(postQueryKey);

      toast({
        status: 'success',
        title: 'Added comment',
        isClosable: true,
      });
    },
  });

  useEffect(() => () => toast.closeAll(), [toast]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!authenticatedUser) {
      toast({
        status: 'error',
        title: 'You must be signed in to add a comment',
        isClosable: true,
      });
    } else mutation.mutate({ body: comment, postId });
  };

  return (
    <Flex as="form" onSubmit={handleSubmit} direction="column" align="flex-end">
      <Textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        isRequired
        maxLength={500}
        placeholder="Leave a comment..."
        resize="none"
        bgColor={useColorModeValue('gray.100', 'gray.700')}
        borderColor="gray.500"
        focusBorderColor="purple.500"
        _hover={{ borderColor: 'gray.500' }}
        mb={2}
      />
      <ButtonGroup spacing={4}>
        <Button
          type="submit"
          isDisabled={comment.length === 0}
          colorScheme="purple"
          mb={4}
        >
          Submit
        </Button>
        <Button
          onClick={() => setComment('')}
          isDisabled={comment.length === 0}
          colorScheme="purple"
          mb={4}
        >
          Cancel
        </Button>
      </ButtonGroup>
    </Flex>
  );
};

export default AddComment;
