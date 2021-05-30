import {
  Box,
  ButtonGroup,
  Heading,
  HStack,
  Icon,
  IconButton,
  Link,
  Text,
  useToast,
} from '@chakra-ui/react';
import { Cloudinary } from '@cloudinary/base';
import {} from '@cloudinary/base/qualifiers/flag';
import { useContext, useEffect } from 'react';
import { FaCommentAlt, FaDownload, FaHeart, FaRegHeart } from 'react-icons/fa';
import { useQueryClient } from 'react-query';
import { Link as RouterLink } from 'react-router-dom';
import { AuthContext } from '../lib/context/AuthContext';
import {
  PostDetailsFragment,
  PostQuery,
  useCreateFavoriteMutation,
  useDeleteFavoriteMutation,
  usePostQuery,
} from '../lib/generated/graphql';
import { graphQLClient } from '../lib/graphql/client';
import Avatar from './Avatar';
import CommentsList from './CommentsList';

type PostDetailsProps = {
  post: PostDetailsFragment;
  isFavorite: boolean;
};

const PostDetails = ({ post, isFavorite }: PostDetailsProps) => {
  const { authenticatedUser } = useContext(AuthContext);

  const toast = useToast();

  const queryClient = useQueryClient();
  const queryKey = usePostQuery.getKey({ id: post.id });

  const handleSuccess = async () => {
    await queryClient.fetchQuery(queryKey);

    toast({
      status: 'success',
      title: `${isFavorite ? 'Removed from' : 'Added to'} favorites`,
      isClosable: true,
    });
  };

  const updateFavorited = (favorited: boolean) => {
    const data = queryClient.getQueryData<PostQuery>(queryKey);

    if (data?.post) {
      queryClient.setQueryData<PostQuery>(queryKey, {
        post: { ...data.post, isFavorite: favorited },
      });
    }
  };

  const createMutation = useCreateFavoriteMutation(graphQLClient, {
    onMutate: () => updateFavorited(true),
    onSuccess: handleSuccess,
    onError: () => updateFavorited(false),
  });
  const deleteMutation = useDeleteFavoriteMutation(graphQLClient, {
    onMutate: () => updateFavorited(false),
    onSuccess: handleSuccess,
    onError: () => updateFavorited(true),
  });

  useEffect(() => () => toast.closeAll(), [toast]);

  const handleFavorite = async () => {
    if (!authenticatedUser) {
      toast({
        status: 'error',
        title: 'You must be signed in to add a favorite',
        isClosable: true,
      });
    } else if (isFavorite) deleteMutation.mutate({ postId: post.id });
    else createMutation.mutate({ postId: post.id });
  };

  const cldUrl = new Cloudinary({ cloud: { cloudName: 'hnisqhgvp' } })
    .image(post.image.publicId)
    .addFlag('attachment')
    .toURL();

  return (
    <>
      <HStack mb={4} align="center">
        <Avatar avatar={post.user.avatar} mr={2} w={16} />
        <Box flexGrow={1} pr={4}>
          <Heading as="h1">{post.title}</Heading>
          <Text>
            {`by `}
            <Link
              as={RouterLink}
              to={`/users/${post.user?.id}`}
              textDecoration="underline"
              _hover={{ color: 'purple.200' }}
            >
              {post.user.username}
            </Link>
          </Text>
        </Box>
        <ButtonGroup spacing={4} h="100%">
          <IconButton
            aria-label="toggle favorite"
            onClick={handleFavorite}
            icon={<Icon as={FaRegHeart} />}
            colorScheme={isFavorite ? 'purple' : 'gray'}
            w={16}
          />
          <Link href={cldUrl}>
            <IconButton
              aria-label="download image"
              icon={<Icon as={FaDownload} />}
              w={16}
            />
          </Link>
        </ButtonGroup>
      </HStack>
      <HStack mb={4}>
        <Icon as={FaHeart} />
        <Text pr={2}>
          {`${post.favoriteCount} `}
          {post.favoriteCount === 1 ? 'favorite' : 'favorites'}
        </Text>
        <Icon as={FaCommentAlt} />
        <Text>
          {`${post.commentCount} `}
          {post.commentCount === 1 ? 'comment' : 'comments'}
        </Text>
      </HStack>
      <Box mb={8}>
        <Text color="gray.500">{post.body}</Text>
        <Text color="gray.500">
          Published on {new Date(post.createdAt).toDateString()}
        </Text>
      </Box>
      <CommentsList commentCount={post.commentCount || 0} postId={post.id} />
    </>
  );
};

export default PostDetails;
