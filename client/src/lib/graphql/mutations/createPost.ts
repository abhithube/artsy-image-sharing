import { gql } from '@apollo/client';

export const CREATE_POST = gql`
  mutation createPost($title: String!, $body: String, $file: String!) {
    post: createPost(title: $title, body: $body, file: $file) {
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
  }
`;
