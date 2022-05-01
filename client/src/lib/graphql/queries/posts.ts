import { gql } from '@apollo/client';

export const POSTS = gql`
  query posts(
    $userId: Int
    $field: PostSortField! = CREATED_AT
    $direction: SortDirection! = DESC
    $limit: Int
    $page: Int
  ) {
    posts(
      userId: $userId
      orderBy: { field: $field, direction: $direction }
      limit: $limit
      page: $page
    ) {
      results {
        id
        title
        imageUrl
      }
      prevPage
      nextPage
    }
  }
`;
