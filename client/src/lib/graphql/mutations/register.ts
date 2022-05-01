import { gql } from '@apollo/client';

export const REGISTER = gql`
  mutation register($username: String!, $password: String!) {
    registered: register(username: $username, password: $password)
  }
`;
