import { gql } from '@apollo/client';

export const CREATE_COMMENT = gql`
  mutation createComment($body: String!, $postId: Int!) {
    comment: createComment(body: $body, postId: $postId) {
      id
      body
      user {
        id
        username
        avatarUrl
      }
      createdAt
    }
  }
`;
