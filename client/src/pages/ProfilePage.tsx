import { Box, Heading, Spinner, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import FavoritesGallery from '../components/FavoritesGallery';
import PostsGallery from '../components/PostsGallery';
import { useUserQuery } from '../generated/graphql';
import { graphQLClient } from '../graphql/client';

type Params = {
  id: string;
};

const ProfilePage = () => {
  const { id } = useParams<Params>();

  const { data, isLoading } = useUserQuery(graphQLClient, { id: Number(id) });

  if (isLoading) return <Spinner speed="1s" />;

  return (
    <Box h="100%">
      {data && (
        <>
          <Heading as="h1">{data.user.username}&apos;s Gallery</Heading>
          <PostsGallery
            userId={data.user.id}
            initPosts={data.user.posts || { results: [] }}
          />
          <FavoritesGallery
            userId={data.user.id}
            initFavorites={data.user.favorites || { results: [] }}
          />
        </>
      )}
      {!data && <Text>User not found</Text>}
    </Box>
  );
};

export default ProfilePage;
