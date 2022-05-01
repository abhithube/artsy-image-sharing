import { useApolloClient, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import FavoritesGallery from '../components/FavoritesGallery';
import PostsGallery from '../components/PostsGallery';
import { FAVORITES, USER } from '../lib/graphql';

type Params = {
  id: string;
};

export default function ProfilePage() {
  const { id } = useParams<Params>();

  const client = useApolloClient();

  const { data, loading } = useQuery(USER, {
    variables: {
      id: Number(id),
    },
    onCompleted: (userData: any) => {
      client.writeQuery({
        query: FAVORITES,
        data: userData.user.favorites,
      });
      client.writeQuery({
        query: FAVORITES,
        data: userData.user.favorites,
      });
    },
  });

  if (loading) return null;

  return (
    <div>
      {data && (
        <>
          <h1 className="text-2xl font-semibold">
            {data.user.username}&apos;s Gallery
          </h1>
          <PostsGallery userId={data.user.id} />
          <FavoritesGallery userId={data.user.id} />
        </>
      )}
      {!data && <p>This user does not exist.</p>}
    </div>
  );
}
