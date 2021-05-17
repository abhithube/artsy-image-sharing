import {
  Avatar,
  Box,
  Flex,
  HStack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { CommentFragment } from '../generated/graphql';

type CommentProps = {
  comment: CommentFragment;
};

const CommentItem = ({ comment }: CommentProps) => {
  return (
    <HStack
      p='4'
      bgColor={useColorModeValue('gray.100', 'gray.700')}
      rounded='lg'
    >
      <Avatar
        src={
          comment.user.avatarUrl
            ? `https://res.cloudinary.com/athube/image/upload/q_auto:eco,w_200,h_200,r_max/${
                comment.user.avatarUrl.split('upload/')[1]
              }`
            : undefined
        }
        mr='4'
        bg='purple.500'
        borderWidth='1px'
        borderColor='purple.500'
      />
      <Box>
        <Flex mb='1'>
          <Text
            mr='4'
            color={useColorModeValue('gray.600', 'gray.400')}
            fontWeight='semibold'
          >
            {comment.user.username}
          </Text>
          <Text color={useColorModeValue('gray.500', 'gray.500')}>
            {new Date(comment.createdAt).toLocaleString()}
          </Text>
        </Flex>
        <Text>{comment.body}</Text>
      </Box>
    </HStack>
  );
};

export default CommentItem;
