import { AuthenticationError } from 'apollo-server-express';
import { database, resolversStore } from '#internal/services';

resolversStore.add('queries', {
  getOwnChats: async (_parent, _arguments, { userId }) => {
    if (!userId) throw new AuthenticationError('missing_token');

    return database.chat.findMany({
      where: {
        fromId: userId,
      },
    });
  },
});
