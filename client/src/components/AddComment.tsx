import {
  Button,
  ButtonGroup,
  Flex,
  Textarea,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { FormEvent, useContext, useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { graphQLClient } from '../App';
import { AuthContext } from '../context/AuthContext';
import {
  useCommentsQuery,
  useCreateCommentMutation,
} from '../generated/graphql';

type AddCommentProps = {
  postId: number;
};

const AddComment = ({ postId }: AddCommentProps) => {
  const { authenticatedUser } = useContext(AuthContext);

  const queryClient = useQueryClient();
  const queryKey = useCommentsQuery.getKey({ postId });

  const mutation = useCreateCommentMutation(graphQLClient, {
    onSuccess: () => {
      setComment('');
      queryClient.fetchInfiniteQuery(queryKey);

      toast({
        status: 'success',
        title: 'Added comment',
        isClosable: true,
      });
    },
  });

  const [comment, setComment] = useState('');

  const toast = useToast();

  useEffect(() => () => toast.closeAll(), [toast]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!authenticatedUser) {
      return toast({
        status: 'error',
        title: 'You must be signed in to add a comment',
        isClosable: true,
      });
    }

    mutation.mutate({ body: comment, postId });
  };

  return (
    <Flex as='form' onSubmit={handleSubmit} direction='column' align='flex-end'>
      <Textarea
        value={comment}
        onChange={e => setComment(e.target.value)}
        isRequired
        maxLength={500}
        placeholder='Leave a comment...'
        resize='none'
        bgColor={useColorModeValue('gray.100', 'gray.700')}
        borderColor='gray.500'
        focusBorderColor='purple.500'
        _hover={{ borderColor: 'gray.500' }}
        mb='2'
      />
      <ButtonGroup spacing='4'>
        <Button
          type='submit'
          isDisabled={comment.length === 0}
          colorScheme='purple'
          mb='4'
        >
          Submit
        </Button>
        <Button
          onClick={() => setComment('')}
          isDisabled={comment.length === 0}
          colorScheme='purple'
          mb='4'
        >
          Cancel
        </Button>
      </ButtonGroup>
    </Flex>
  );
};

export default AddComment;
