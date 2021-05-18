import { Box, Heading, Spinner } from '@chakra-ui/react';
import { Redirect, useParams } from 'react-router';
import { graphQLClient } from '../App';
import FavoritesGallery from '../components/FavoritesGallery';
import PostsGallery from '../components/PostsGallery';
import { useUserQuery } from '../generated/graphql';

type Params = {
  id: string;
};

const ProfilePage = () => {
  const { id } = useParams<Params>();

  const { data, isLoading } = useUserQuery(graphQLClient, { id: Number(id) });

  return (
    <Box h='100%'>
      {!isLoading && data?.user && (
        <>
          <Heading as='h1'>{data.user.username}'s Gallery</Heading>
          <PostsGallery
            userId={data.user.id}
            initPosts={data.user.posts || { results: [], totalPages: 0 }}
          />
          <FavoritesGallery
            userId={data.user.id}
            initFavorites={data.user.favorites || { results: [] }}
          />
        </>
      )}
      {!isLoading && !data?.user && <Redirect to='/404' />}
      {isLoading && <Spinner speed='1s' />}
    </Box>
  );
};

export default ProfilePage;
