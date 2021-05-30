import { Box, Flex, HStack, Text, useColorModeValue } from '@chakra-ui/react';
import { CommentFragment } from '../lib/generated/graphql';
import Avatar from './Avatar';

type CommentProps = {
  comment: CommentFragment;
};

const CommentItem = ({ comment }: CommentProps) => {
  return (
    <HStack
      p={4}
      bgColor={useColorModeValue('gray.100', 'gray.700')}
      rounded="lg"
    >
      <Avatar avatar={comment.user.avatar} w={12} mr={2} />
      <Box>
        <Flex mb={1}>
          <Text
            mr={4}
            color={useColorModeValue('gray.600', 'gray.400')}
            fontWeight="semibold"
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
