import { AuthenticationError } from 'apollo-server-express';
import type { QueryResolvers } from '#internal/types/graphql';
import type { ResolverContext } from '#internal/lib';

import { database, resolversStore } from '#internal/services';

const ChatQueries: QueryResolvers<ResolverContext> = {
  getOwnChats: async (_parent, _arguments, { userId }) => {
    if (!userId) throw new AuthenticationError('missing_token');

    return database.chat.findMany({
      where: {
        fromId: userId,
      },
    });
  },
};

resolversStore.add('queries', ChatQueries);
