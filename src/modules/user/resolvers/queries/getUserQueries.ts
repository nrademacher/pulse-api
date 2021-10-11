import type { QueryResolvers } from '@/types/graphql';
import type { ResolverContext } from '@/context';

import { AuthenticationError } from 'apollo-server-express';

import { db } from '@/services';

export const GetUserQueries: QueryResolvers<ResolverContext> = {
  getSelf: async (_parent, _args, context) => {
    if (!context?.userId) throw new AuthenticationError('missing_token');

    return await db.user.findUnique({ where: { id: context.userId } });
  },
  getUserById: async (_parent, args, context) => {
    if (!context?.userId) throw new AuthenticationError('missing_token');

    return await db.user.findUnique({ where: { id: args.id } });
  },
  getUserByEmail: async (_parent, args, context) => {
    if (!context?.userId) throw new AuthenticationError('missing_token');

    return await db.user.findUnique({ where: { email: args.email } });
  },
};
