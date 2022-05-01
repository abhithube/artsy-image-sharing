import { gql } from '@apollo/client';

export const FAVORITES = gql`
  query favorites(
    $postId: Int
    $userId: Int
    $field: FavoriteSortField! = CREATED_AT
    $direction: SortDirection! = DESC
    $limit: Int
    $page: Int
  ) {
    favorites(
      postId: $postId
      userId: $userId
      orderBy: { field: $field, direction: $direction }
      limit: $limit
      page: $page
    ) {
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
  }
`;
