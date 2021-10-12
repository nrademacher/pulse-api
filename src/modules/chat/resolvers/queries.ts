import { AuthenticationError } from 'apollo-server-express';
import type { Resolvers } from '#internal/types/graphql';
import type { ResolverContext } from '#internal/lib';

import { database } from '#internal/services';

export const ChatQueries: Resolvers<ResolverContext> = {
  Query: {
    getOwnChats: async (_parent, _arguments, { userId }) => {
      if (!userId) throw new AuthenticationError('missing_token');

      return database.chat.findMany({
        where: {
          fromId: userId,
        },
      });
    },
  },
};
