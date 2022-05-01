import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($username: String!, $password: String!, $avatar: String) {
    auth: login(username: $username, password: $password, avatar: $avatar) {
      id
      username
      avatarUrl
      confirmed
    }
  }
`;
