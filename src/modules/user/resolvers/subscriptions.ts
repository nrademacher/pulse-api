import type { SubscriptionResolvers, User } from '#internal/types/graphql';
import type { ResolverContext } from '#internal/lib';

import { pubsub } from '#internal/services';

export const UserSubscriptions: SubscriptionResolvers<ResolverContext> = {
  subscribeToUserEvent: {
    subscribe: (_parent, { event }) => pubsub.asyncIterator([event]),
    resolve: async (payload: User) => payload,
  },
};
