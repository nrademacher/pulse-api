import { loadSchemaSync } from '@graphql-tools/load';
import { join } from 'node:path';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { addResolversToSchema } from '@graphql-tools/schema';
import { mergeResolvers } from './utils';
import { UserResolvers, ProjectResolvers, ChatResolvers } from './modules';

const baseSchema = loadSchemaSync(join(__dirname, 'modules/**/*.graphql'), {
  loaders: [new GraphQLFileLoader()],
});

const resolvers = mergeResolvers(
  UserResolvers,
  ProjectResolvers,
  ChatResolvers,
);

export const schema = addResolversToSchema({
  schema: baseSchema,
  resolvers,
});
