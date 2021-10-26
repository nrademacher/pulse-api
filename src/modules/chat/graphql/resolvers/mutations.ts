import type { MutationResolvers } from '#internal/types';
import { sendMessage } from '../../prisma';
import { pubsub } from '#internal/services';
import { coerceToAuthError } from '#internal/utils';
import { AuthenticationError } from 'apollo-server-express';

export const ChatMutations: MutationResolvers = {
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
