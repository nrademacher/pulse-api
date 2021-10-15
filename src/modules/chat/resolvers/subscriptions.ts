import type { Chat, SubscriptionResolvers } from '#internal/types/graphql';
import type { ResolverContext } from '#internal/lib';

import { pubsub, resolversStore } from '#internal/services';

const ChatSubscriptions: SubscriptionResolvers<ResolverContext> = {
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

resolversStore.add('subscriptions', ChatSubscriptions);
