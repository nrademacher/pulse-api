import type { Resolvers } from '@/types/graphql';
import type { ResolverContext } from '@/context';

import { ChatQueries } from './queries';
import { ChatMutations } from './mutations';
import { ChatSubscriptions } from './subscriptions';

export const ChatResolvers: Resolvers<ResolverContext> = {
  ...ChatQueries,
  Mutation: ChatMutations,
  Subscription: ChatSubscriptions,
};
