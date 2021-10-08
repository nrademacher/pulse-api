import type { Resolvers } from '@/graphql/types';
import type { ResolverContext } from '@/context';
import { AuthenticationError } from 'apollo-server';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { db } from '@/database';

export const UserQueries: Resolvers<ResolverContext> = {
  Query: {
    findSelf: async (_parent, _args, context) => {
      if (!context?.userId) throw new AuthenticationError('missing_token');

      return await db.user.findUnique({ where: { id: context.userId } });
    },
    findUserById: async (_parent, args, _context) => {
      return await db.user.findUnique({ where: { id: args.id } });
    },
    findUserByEmail: async (_parent, args, _context) => {
      return await db.user.findUnique({ where: { email: args.email } });
    },
    login: async (_parent, args, _context) => {
      if (!args.email || !args.password) {
        throw new AuthenticationError('missing_credentials');
      }

      const user = await db.user.findUnique({ where: { email: args.email } });

      if (!user) throw new AuthenticationError('invalid_credentials');

      const match = await bcrypt.compare(args.password, user.passwordHash!);

      if (!match) throw new AuthenticationError('invalid_credentials');

      return jwt.sign({ userId: user.id }, process.env.JWT_SECRET!);
    },
    //
  },
};
