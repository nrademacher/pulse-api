import type { MutationResolvers, ResolverContext } from '#internal/types';
import { AuthenticationError } from 'apollo-server-express';
import { sendMessage } from '../../prisma';
import { pubsub } from '#internal/services';
import { coerceToAuthError } from '#internal/utils';

export const ChatMutations: MutationResolvers<ResolverContext> = {
  sendMessage: async (
    _parent,
    { recipientEmail, message, channel },
    { userId },
  ) => {
    if (!userId) throw new AuthenticationError('missing_token');

    try {
      const newMessage = await sendMessage({
        userId,
        recipientEmail,
        channel,
        message,
      });

      const { id, from, to, channel: pubChannel } = newMessage;

      pubsub.publish(pubChannel, { message, id, from, to, channel });

      return newMessage;
    } catch (error) {
      coerceToAuthError(error, 'error_sending_message');
    }
  },
};
