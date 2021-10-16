import { pubsub, resolversStore } from '#internal/services';
import type { User } from '#internal/types';

resolversStore.add('subscriptions', {
  subscribeToUserEvent: {
    subscribe: (_parent, { event }) => pubsub.asyncIterator([event]),
    resolve: async (payload: User) => payload,
  },
});
