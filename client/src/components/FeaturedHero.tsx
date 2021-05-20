import { Avatar } from '@chakra-ui/avatar';
import { Button } from '@chakra-ui/button';
import { useColorModeValue } from '@chakra-ui/color-mode';
import {
  Box,
  Heading,
  HStack,
  Stack,
  StackDivider,
  Text,
  VStack,
} from '@chakra-ui/layout';
import { FaCommentAlt, FaHeart } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';
import { PostDetailsFragment } from '../generated/graphql';
import PreviewImage from './PreviewImage';

type FeaturedHeroProps = {
  featuredPost: PostDetailsFragment;
};

const FeaturedHero = ({ featuredPost }: FeaturedHeroProps) => {
  return (
    <Stack
      direction={{ base: 'column', md: 'column', lg: 'row', xl: 'row' }}
      spacing='12'
      justifyContent='center'
      alignItems='center'
      divider={<StackDivider />}
      mb='8'
      p='8'
      bgColor={useColorModeValue('gray.100', 'gray.900')}
    >
      <VStack spacing='4' flexBasis='33%'>
        <Heading fontSize='4xl'>Featured Post</Heading>
        <Text textAlign='center'>
          Upload an image for a chance to be featured here on the home page!
          Create an account or log in to get started!
        </Text>
      </VStack>
      <Stack
        direction={{
          base: 'column',
          md: 'column',
          lg: 'row',
          xl: 'row',
        }}
        flexBasis='66%'
        py='4'
        alignItems='center'
      >
        <Box minW='360px' maxW='480px' mr='4'>
          <PreviewImage post={featuredPost} />
        </Box>
        <VStack spacing='8' w='100%'>
          <VStack
            spacing='4'
            alignItems='flex-start'
            w='100%'
            p='4'
            bgColor={useColorModeValue('gray.50', 'gray.800')}
          >
            <Text color='gray.500'>Post</Text>
            <Heading as='h3' fontSize='3xl'>
              {featuredPost.title}
            </Heading>
            <HStack>
              <FaHeart />
              <Text pr='2'>
                {`${featuredPost.favoriteCount} `}
                {featuredPost.favoriteCount === 1 ? 'favorite' : 'favorites'}
              </Text>
              <FaCommentAlt />
              <Text>
                {`${featuredPost.commentCount} `}
                {featuredPost.commentCount === 1 ? 'comment' : 'comments'}
              </Text>
            </HStack>
            <Button
              as={RouterLink}
              to={`posts/${featuredPost.id}`}
              colorScheme='purple'
            >
              Go to Post
            </Button>
          </VStack>
          <VStack
            spacing='4'
            alignItems='flex-start'
            w='100%'
            p='4'
            bgColor={useColorModeValue('gray.50', 'gray.800')}
          >
            <Text color='gray.500'>User</Text>
            <HStack>
              <Avatar
                src={
                  featuredPost.user.avatarUrl
                    ? `https://res.cloudinary.com/athube/image/upload/q_auto:eco,w_200,h_200,r_max/${
                        featuredPost.user.avatarUrl?.split('upload/')[1]
                      }`
                    : undefined
                }
                mr='2'
                bg='purple.500'
                borderWidth='1px'
                borderColor='purple.500'
              />
              <Text>{featuredPost.user.username}</Text>
            </HStack>
            <Button
              as={RouterLink}
              to={`/users/${featuredPost.user?.id}`}
              colorScheme='purple'
            >
              Go to Profile
            </Button>
          </VStack>
        </VStack>
      </Stack>
    </Stack>
  );
};

export default FeaturedHero;
