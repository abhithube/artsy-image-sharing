import { gql } from '@apollo/client';

export const CREATE_FAVORITE = gql`
  mutation createFavorite($postId: Int!) {
    favorite: createFavorite(postId: $postId) {
      result {
        id
      }
      count
    }
  }
`;
