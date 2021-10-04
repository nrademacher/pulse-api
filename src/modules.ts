import { merge } from 'lodash'
import { join } from 'path'
import { addResolversToSchema } from '@graphql-tools/schema'
import { loadSchemaSync } from '@graphql-tools/load'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'

// resolvers
import { UserResolvers } from './modules/user'
import { CollectionResolvers } from './modules/collection'

// load all graphql files from modules
const baseSchema = loadSchemaSync(join(__dirname, 'modules/**/*.graphql'), {
  loaders: [new GraphQLFileLoader()]
})

export const schema = addResolversToSchema({
  schema: baseSchema,
  resolvers: merge(UserResolvers, CollectionResolvers)
})
