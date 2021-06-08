import { useParams } from 'react-router-dom';
import FavoritesGallery from '../components/FavoritesGallery';
import PostsGallery from '../components/PostsGallery';
import { useUserQuery } from '../lib/generated/graphql';
import { graphQLClient } from '../lib/graphql/client';

type Params = {
  id: string;
};

const ProfilePage = () => {
  const { id } = useParams<Params>();

  const { data, isLoading } = useUserQuery(graphQLClient, { id: Number(id) });

  if (isLoading) return null;

  return (
    <div>
      {data && (
        <>
          <h1 className="text-2xl font-semibold">
            {data.user.username}&apos;s Gallery
          </h1>
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
      {!data && <p>This user does not exist.</p>}
    </div>
  );
};

export default ProfilePage;
