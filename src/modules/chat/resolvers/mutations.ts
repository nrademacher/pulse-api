import { AuthenticationError } from 'apollo-server-express';
import type { MutationResolvers } from '@/types/graphql';
import type { ResolverContext } from '@/context';

import { database, pubsub } from '@/services';

export const ChatMutations: MutationResolvers<ResolverContext> = {
  sendMessage: async (
    _parent,
    { recipientEmail, message, channel },
    { userId },
  ) => {
    if (!userId) throw new AuthenticationError('missing_token');

    let recipientId;

    if (channel === 'PRIVATE' && recipientEmail) {
      const recipient = await database.user.findUnique({
        where: { email: recipientEmail },
      });

      if (!recipient) throw new AuthenticationError('user_not_found');

      const { id } = recipient;

      recipientId = id;
    }

    if (!channel) channel = 'ALL';

    const data = {
      message,
      fromId: userId,
      toId: recipientId,
      channel,
    };

    pubsub.publish(channel, data);

    return database.chat.create({
      data,
    });
  },
};
