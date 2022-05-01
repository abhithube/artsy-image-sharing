import { gql } from '@apollo/client';

export const FEATURED = gql`
  query featured(
    $field: PostSortField!
    $direction: SortDirection!
    $limit: Int
  ) {
    posts(orderBy: { field: $field, direction: $direction }, limit: $limit) {
      results {
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
  }
`;
