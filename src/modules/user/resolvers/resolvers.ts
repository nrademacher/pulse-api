import type { Resolvers } from '@/graphql/types'
import type { ResolverContext } from '@/context'
import { UserQueries } from './queries'
import { UserMutations } from './mutations'

export const UserResolvers: Resolvers<ResolverContext> = {
  ...UserQueries,
  ...UserMutations
}
