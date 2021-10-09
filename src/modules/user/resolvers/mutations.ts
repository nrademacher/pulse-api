import type { Resolvers } from '@/types/graphql';
import type { ResolverContext } from '@/types/context';

import { AuthenticationError } from 'apollo-server';
import { db } from '@/database';
import * as bcrypt from 'bcrypt';

export const UserMutations: Resolvers<ResolverContext> = {
  Mutation: {
    createUser: async (_parent, args, _context) => {
      const { email, password, name, displayName, bio, role } = args;

      if (!email || !password) {
        throw new AuthenticationError('missing_credentials');
      }

      const exisitingUser = await db.user.findUnique({ where: { email } });

      if (exisitingUser) throw new AuthenticationError('failed_to_create_user');

      const hash = bcrypt.hashSync(password || '', 10);

      return await db.user.create({
        data: {
          email,
          passwordHash: hash,
          name,
          displayName,
          bio,
          role: role!,
        },
      });
    },
  },
};
