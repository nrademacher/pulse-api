import type { MutationResolvers } from '#internal/types';
import { sendMessage } from '../../prisma';
import { pubsub } from '#internal/services';
import { catchAuthError } from '#internal/utils';

export const ChatMutations: MutationResolvers = {
  sendMessage: async (
    _parent,
    { recipientEmail, message, channel },
    { userId },
  ) => {
    try {
      const newMessage = await sendMessage({
        userId,
        recipientEmail,
        channel,
        message,
      });

      const { fromId, toId, channel: pubChannel } = newMessage;

      pubsub.publish(pubChannel, { message, fromId, toId, channel });

      return newMessage;
    } catch (error) {
      catchAuthError(error, 'error_sending_message');
    }
  },
};
