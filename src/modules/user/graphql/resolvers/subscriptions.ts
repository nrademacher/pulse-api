import type { SubscriptionResolvers, User } from '#internal/types';
import { pubsub } from '#internal/services';

export const UserSubscriptions: SubscriptionResolvers = {
  subscribeToUserEvent: {
    subscribe: (_parent, { event }) => pubsub.asyncIterator([event]),
    resolve: async (payload: User) => payload,
  },
};
