import type { Resolvers } from '@/types/graphql';
import type { ResolverContext } from '@/context';

import { AuthenticationError } from 'apollo-server-express';

import { db } from '@/services';

export const ChatQueries: Resolvers<ResolverContext> = {
  Query: {
    getOwnChats: async (_parent, _args, { userId }) => {
      if (!userId) throw new AuthenticationError('missing_token');

      return await db.chat.findMany({
        where: {
          fromId: userId,
        },
      });
    },
  },
};
