import type { Chat, SubscriptionResolvers } from '@/types/graphql';
import type { ResolverContext } from '@/context';

import { pubsub } from '@/services';

export const ChatSubscriptions: SubscriptionResolvers<ResolverContext> = {
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
