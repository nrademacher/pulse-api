import type { SubscriptionResolvers, User } from '#internal/types/graphql';
import type { ResolverContext } from '#internal/lib';

import { pubsub, resolversStore } from '#internal/services';

const UserSubscriptions: SubscriptionResolvers<ResolverContext> = {
  subscribeToUserEvent: {
    subscribe: (_parent, { event }) => pubsub.asyncIterator([event]),
    resolve: async (payload: User) => payload,
  },
};

resolversStore.add('subscriptions', UserSubscriptions);
