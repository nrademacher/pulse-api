import { database, pubsub, resolversStore } from '#internal/services';
import { AuthenticationError } from 'apollo-server-express';

resolversStore.add('mutations', {
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
});
