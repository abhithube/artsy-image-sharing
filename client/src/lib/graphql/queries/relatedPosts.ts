import { gql } from '@apollo/client';

export const RELATED_POSTS = gql`
  query relatedPosts($postId: Int!) {
    relatedPosts(postId: $postId) {
      id
      title
      imageUrl
    }
  }
`;
