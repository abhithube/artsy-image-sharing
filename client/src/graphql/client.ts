import { GraphQLClient } from 'graphql-request';

export const graphQLClient = new GraphQLClient(
  `${process.env.SERVER_URL}/graphql`,
  { credentials: 'include' }
);
