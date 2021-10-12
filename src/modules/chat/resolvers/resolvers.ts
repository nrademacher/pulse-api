import type { Resolvers } from '#internal/types/graphql';
import type { ResolverContext } from '#internal/lib';

import { ChatQueries } from './queries';
import { ChatMutations } from './mutations';
import { ChatSubscriptions } from './subscriptions';

export const ChatResolvers: Resolvers<ResolverContext> = {
  ...ChatQueries,
  Mutation: ChatMutations,
  Subscription: ChatSubscriptions,
};
