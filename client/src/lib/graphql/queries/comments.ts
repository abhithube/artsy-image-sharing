import { gql } from '@apollo/client';

export const COMMENTS = gql`
  query comments(
    $postId: Int
    $field: CommentSortField! = CREATED_AT
    $direction: SortDirection! = DESC
    $limit: Int
    $page: Int
  ) {
    comments(
      postId: $postId
      orderBy: { field: $field, direction: $direction }
      limit: $limit
      page: $page
    ) {
      results {
        id
        body
        user {
          id
          username
          avatarUrl
        }
        createdAt
      }
      nextPage
    }
  }
`;
