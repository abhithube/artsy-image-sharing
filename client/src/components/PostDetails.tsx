import {
  Box,
  ButtonGroup,
  Heading,
  HStack,
  Icon,
  IconButton,
  Link,
  Spinner,
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
  PostQuery,
  useCreateFavoriteMutation,
  useDeleteFavoriteMutation,
  usePostQuery,
} from '../lib/generated/graphql';
import { graphQLClient } from '../lib/graphql/client';
import Avatar from './Avatar';
import CommentsList from './CommentsList';

type PostDetailsProps = {
  id: number;
};

const PostDetails = ({ id }: PostDetailsProps) => {
  const { authenticatedUser } = useContext(AuthContext);

  const toast = useToast();

  const queryClient = useQueryClient();
  const queryKey = usePostQuery.getKey({ id });

  const { data, isLoading } = usePostQuery(graphQLClient, { id: Number(id) });

  const handleSuccess = async () => {
    await queryClient.fetchQuery(queryKey);

    toast({
      status: 'success',
      title: `${
        data?.post?.isFavorite ? 'Removed from' : 'Added to'
      } favorites`,
      isClosable: true,
    });
  };

  const updateFavorited = (favorited: boolean) => {
    const data2 = queryClient.getQueryData<PostQuery>(queryKey);

    if (data2?.post) {
      queryClient.setQueryData<PostQuery>(queryKey, {
        post: { ...data2.post, isFavorite: favorited },
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
    } else if (data?.post?.isFavorite) deleteMutation.mutate({ postId: id });
    else createMutation.mutate({ postId: id });
  };

  const cldUrl = new Cloudinary({ cloud: { cloudName: 'hnisqhgvp' } })
    .image(data?.post?.result.image.publicId)
    .addFlag('attachment')
    .toURL();

  if (isLoading) return <Spinner speed="1s" />;

  return (
    <>
      {data?.post && (
        <>
          <HStack mb={4} align="center">
            <Avatar avatar={data.post.result.user.avatar} mr={2} w={16} />
            <Box flexGrow={1} pr={4}>
              <Heading as="h1">{data.post.result.title}</Heading>
              <Text>
                {`by `}
                <Link
                  as={RouterLink}
                  to={`/users/${data.post.result.user?.id}`}
                  textDecoration="underline"
                  _hover={{ color: 'purple.200' }}
                >
                  {data.post.result.user.username}
                </Link>
              </Text>
            </Box>
            <ButtonGroup spacing={4} h="100%">
              <IconButton
                aria-label="toggle favorite"
                onClick={handleFavorite}
                icon={<Icon as={FaRegHeart} />}
                colorScheme={data.post.isFavorite ? 'purple' : 'gray'}
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
              {`${data.post.result.favoriteCount} `}
              {data.post.result.favoriteCount === 1 ? 'favorite' : 'favorites'}
            </Text>
            <Icon as={FaCommentAlt} />
            <Text>
              {`${data.post.result.commentCount} `}
              {data.post.result.commentCount === 1 ? 'comment' : 'comments'}
            </Text>
          </HStack>
          <Box mb={8}>
            <Text color="gray.500">{data.post.result.body}</Text>
            <Text color="gray.500">
              Published on {new Date(data.post.result.createdAt).toDateString()}
            </Text>
          </Box>
          <CommentsList
            commentCount={data.post.result.commentCount || 0}
            postId={id}
          />
        </>
      )}
    </>
  );
};

export default PostDetails;
