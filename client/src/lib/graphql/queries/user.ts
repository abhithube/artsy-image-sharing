import { gql } from '@apollo/client';

export const USER = gql`
  query user($id: Int!) {
    user(id: $id) {
      id
      username
      avatarUrl
      posts(limit: 5) {
        results {
          id
          title
          imageUrl
        }
        prevPage
        nextPage
      }
      postCount
      favorites(limit: 5) {
        results {
          id
          post {
            id
            title
            imageUrl
          }
          createdAt
        }
        prevPage
        nextPage
      }
      favoriteCount
      createdAt
    }
  }
`;
