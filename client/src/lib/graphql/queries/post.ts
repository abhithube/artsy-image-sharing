import { gql } from '@apollo/client';

export const POST = gql`
  query post($id: Int!) {
    post(id: $id) {
      result {
        id
        title
        imageUrl
        body
        createdAt
        user {
          id
          username
          avatarUrl
        }
        favoriteCount
        commentCount
      }
      isFavorite
    }
  }
`;
