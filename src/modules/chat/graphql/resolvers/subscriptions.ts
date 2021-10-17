import type { Chat, SubscriptionResolvers } from '#internal/types';
import { pubsub } from '#internal/services';

export const ChatSubscriptions: SubscriptionResolvers = {
  subscribeToChannel: {
    subscribe: (_parent, { channel }) => {
      if (!channel) channel = 'ALL';

      return pubsub.asyncIterator([channel]);
    },
    resolve: (payload: Chat) => {
      return payload;
    },
  },
};
