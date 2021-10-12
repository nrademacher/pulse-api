import type { Resolvers } from '#internal/types/graphql';
import type { ResolverContext } from '#internal/lib';

import { UserQueries } from './queries';
import { UserMutations } from './mutations';
import { UserSubscriptions } from './subscriptions';

export const UserResolvers: Resolvers<ResolverContext> = {
  Query: UserQueries,
  Mutation: UserMutations,
  Subscription: UserSubscriptions,
};
