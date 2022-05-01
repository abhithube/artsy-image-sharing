import { gql } from '@apollo/client';

export const AUTH = gql`
  query auth {
    auth {
      id
      username
      avatarUrl
      confirmed
    }
  }
`;
