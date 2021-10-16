import { pubsub, resolversStore } from '#internal/services';
import type { Chat } from '#internal/types';

resolversStore.add('subscriptions', {
  subscribeToChannel: {
    subscribe: (_parent, { channel }) => {
      if (!channel) channel = 'ALL';

      return pubsub.asyncIterator([channel]);
    },
    resolve: (payload: Chat) => {
      return payload;
    },
  },
});
