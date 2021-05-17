import {
  Avatar,
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
import { useContext, useEffect, useState } from 'react';
import { FaCommentAlt, FaDownload, FaHeart, FaRegHeart } from 'react-icons/fa';
import { useQueryClient } from 'react-query';
import { Link as RouterLink } from 'react-router-dom';
import { graphQLClient } from '../App';
import { AuthContext } from '../context/AuthContext';
import {
  CreateFavoriteMutation,
  PostDetailsFragment,
  useCreateFavoriteMutation,
  useDeleteFavoriteMutation,
  usePostQuery,
} from '../generated/graphql';
import CommentsList from './CommentsList';

type PostDetailsProps = {
  post: PostDetailsFragment;
  isFavorite: boolean;
};

const PostDetails = ({ post, isFavorite: hasFavorited }: PostDetailsProps) => {
  const { authenticatedUser } = useContext(AuthContext);
  const [commentCount, setCommentCount] = useState(post.commentCount!);
  const [favoriteCount, setFavoriteCount] = useState(post.favoriteCount!);
  const [isFavorite, setIsFavorite] = useState(hasFavorited);

  const queryClient = useQueryClient();
  const queryKey = usePostQuery.getKey({ id: post.id });

  const createMutation = useCreateFavoriteMutation(graphQLClient, {
    onSuccess: data => handleSuccess(data),
  });
  const deleteMutation = useDeleteFavoriteMutation(graphQLClient, {
    onSuccess: data => handleSuccess(data),
  });

  const toast = useToast();

  useEffect(() => () => toast.closeAll(), [toast]);

  const handleFavorite = async () => {
    if (!authenticatedUser) {
      return toast({
        status: 'error',
        title: 'You must be signed in to add a favorite',
        isClosable: true,
      });
    }

    if (isFavorite) deleteMutation.mutate({ postId: post.id });
    else createMutation.mutate({ postId: post.id });
  };

  const handleSuccess = (data: CreateFavoriteMutation) => {
    if (!data.favorite) return;

    setFavoriteCount(data.favorite.count);
    setIsFavorite(prev => !prev);

    queryClient.setQueryData(queryKey, {
      post: {
        result: { ...post, favoriteCount: data.favorite.count },
        isFavorite: true,
      },
    });

    toast({
      status: 'success',
      title: `${isFavorite ? 'Removed from' : 'Added to'} favorites`,
      isClosable: true,
    });
  };

  return (
    <>
      <HStack mb='4' align='stretch'>
        <Avatar
          src={
            post.user.avatarUrl
              ? `https://res.cloudinary.com/athube/image/upload/q_auto:eco,w_200,h_200,r_max/${
                  post.user.avatarUrl?.split('upload/')[1]
                }`
              : undefined
          }
          mr='4'
          bg='purple.500'
          borderWidth='1px'
          borderColor='purple.500'
        />
        <Box flexGrow={1} pr='4'>
          <Heading as='h1'>{post.title}</Heading>
          <Text>
            {`by `}
            <Link
              as={RouterLink}
              to={`/users/${post.user?.id}`}
              textDecoration='underline'
              _hover={{ color: 'purple.200' }}
            >
              {post.user.username}
            </Link>
          </Text>
        </Box>
        <ButtonGroup spacing='4' h='100%'>
          <IconButton
            aria-label='toggle favorite'
            onClick={handleFavorite}
            icon={<FaRegHeart />}
            colorScheme={isFavorite ? 'purple' : 'gray'}
            w='16'
          ></IconButton>
          <Link
            href={`https://res.cloudinary.com/athube/image/upload/fl_attachment/${
              post.imageUrl.split('upload/')[1]
            }`}
          >
            <IconButton
              aria-label='download image'
              icon={<FaDownload />}
              w='16'
            />
          </Link>
        </ButtonGroup>
      </HStack>
      <HStack mb='4'>
        <Icon as={FaHeart} />
        <Text pr='2'>
          {`${favoriteCount} `}
          {favoriteCount === 1 ? 'favorite' : 'favorites'}
        </Text>
        <Icon as={FaCommentAlt} />
        <Text>
          {`${commentCount} `}
          {commentCount === 1 ? 'comment' : 'comments'}
        </Text>
      </HStack>
      <Box mb='8'>
        <Text color='gray.500'>{post.body}</Text>
        <Text color='gray.500'>
          Published on {new Date(post.createdAt).toDateString()}
        </Text>
      </Box>
      <CommentsList
        commentCount={commentCount}
        setCommentCount={setCommentCount}
        postId={post.id}
      />
    </>
  );
};

export default PostDetails;
