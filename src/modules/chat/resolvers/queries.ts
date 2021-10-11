import { AuthenticationError } from 'apollo-server-express';
import type { Resolvers } from '@/types/graphql';
import type { ResolverContext } from '@/context';

import { database } from '@/services';

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
