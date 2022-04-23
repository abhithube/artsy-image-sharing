import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';
import path from 'path';

const typeDefsArray = loadFilesSync(path.join(__dirname, './types'));
const typeDefs = mergeTypeDefs(typeDefsArray);

const resolversArray = loadFilesSync(path.join(__dirname, './resolvers'));

const resolvers = mergeResolvers(resolversArray);

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
