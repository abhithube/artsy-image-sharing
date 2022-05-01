import { gql } from '@apollo/client';

export const DELETE_FAVORITE = gql`
  mutation deleteFavorite($postId: Int!) {
    favorite: deleteFavorite(postId: $postId) {
      result {
        id
      }
      count
    }
  }
`;
