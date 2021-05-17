import {
  loadFilesSync,
  makeExecutableSchema,
  mergeResolvers,
  mergeTypeDefs,
} from 'graphql-tools';
import path from 'path';

const typeDefs = mergeTypeDefs(loadFilesSync(path.join(__dirname, './types')));

const resolvers = mergeResolvers(
  loadFilesSync(path.join(__dirname, './resolvers'))
);

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
