import { Avatar } from '@chakra-ui/avatar';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { Heading, HStack, Link, Text, VStack } from '@chakra-ui/layout';
import { FaCommentAlt, FaHeart } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';
import { PostDetailsFragment } from '../generated/graphql';
import PreviewImage from './PreviewImage';

type FeaturedPostProps = {
  post: PostDetailsFragment;
};

const FeaturedPost = ({ post }: FeaturedPostProps) => {
  const bgColor = useColorModeValue('gray.100', 'gray.900');

  return (
    <VStack
      alignItems='flex-start'
      spacing='4'
      p='4'
      bgColor={bgColor}
      rounded='lg'
    >
      <PreviewImage post={post} />
      <HStack>
        <Avatar
          src={
            post.user.avatarUrl
              ? `https://res.cloudinary.com/athube/image/upload/q_auto:eco,w_200,h_200,r_max/${
                  post.user.avatarUrl?.split('upload/')[1]
                }`
              : undefined
          }
          mr='2'
          bg='purple.500'
          borderWidth='1px'
          borderColor='purple.500'
        />
        <VStack alignItems='flex-start'>
          <Heading as='h3' fontSize='lg' noOfLines={1}>
            <Link as={RouterLink} to={`posts/${post.id}`} _hover={{}}>
              {post.title}
            </Link>
          </Heading>
          <Text color='gray.500'>{`by ${post.user.username}`}</Text>
        </VStack>
      </HStack>
      <HStack mb='4'>
        <FaHeart />
        <Text pr='2'>{post.favoriteCount}</Text>
        <FaCommentAlt />
        <Text>{post.commentCount}</Text>
      </HStack>
    </VStack>
  );
};

export default FeaturedPost;
