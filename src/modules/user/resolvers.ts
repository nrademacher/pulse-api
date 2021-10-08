import { AuthenticationError } from 'apollo-server';
import { Resolvers } from '../../graphql/types';
import { ResolverContext } from '../../context';
import { db } from '../../database';
import * as bcrypt from 'bcrypt';

export const UserResolvers: Resolvers<ResolverContext> = {
  Query: {
    //
    findSelf: async (_parent, _args, context) => {
      if (!context?.userId) throw new AuthenticationError('missing_token');

      return await db.user.findUnique({ where: { id: context.userId } });
    },
    //
    findUserById: async (_parent, args, _context) => {
      return await db.user.findUnique({ where: { id: args.id } });
    },
    //
    findUserByEmail: async (_parent, args, _context) => {
      return await db.user.findUnique({ where: { email: args.email } });
    },
    //
    login: async (_parent, args, context) => {
      const user = await db.user.findUnique({ where: { email: args.email } });

      if (!user) throw new AuthenticationError('invalid_credentials');

      const match = await bcrypt.compare(args.password, user.passwordHash);

      if (!match) throw new AuthenticationError('invalid_credentials');

      return '';
    },
    //
  },
  Mutation: {
    createUser: async (_parent, args, _context) => {
      const { email, name, displayName, bio, role, team } = args;

      return await db.user.create({
        data: {
          email,
          name,
          displayName,
          bio,
          team,
          role: role || undefined,
        },
      });
    },
  },
};
