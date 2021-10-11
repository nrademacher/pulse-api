import type { MutationResolvers } from '@/types/graphql';
import type { ResolverContext } from '@/context';

import { AuthenticationError } from 'apollo-server-express';
import * as bcrypt from 'bcrypt';

import { db } from '@/services';

export const UserMutations: MutationResolvers<ResolverContext> = {
  createUser: async (_parent, args, _context) => {
    const { email, password, cc, name, displayName, bio, role } = args;

    if (!email || !password) {
      throw new AuthenticationError('missing_credentials');
    }

    const exisitingUser = await db.user.findUnique({ where: { email } });

    if (exisitingUser) throw new AuthenticationError('user_already_exists');

    const hash = bcrypt.hashSync(password || '', 10);

    return await db.user.create({
      data: {
        email,
        cc,
        name,
        displayName,
        bio,
        role: role!,
        verified: false,
        passwordHash: hash,
      },
    });
  },
  verifyUser: async (_parent, args, context) => {
    if (!context?.userId) throw new AuthenticationError('no_auth_token');

    if (context?.userRole !== 'ADMIN') {
      throw new AuthenticationError('no_permission');
    }

    const exisitingUser = await db.user.findUnique({
      where: { email: args.userEmail },
    });

    if (!exisitingUser) throw new AuthenticationError('user_does_not_exist');

    return await db.user.update({
      where: { email: args.userEmail },
      data: { verified: true },
    });
  },
};
