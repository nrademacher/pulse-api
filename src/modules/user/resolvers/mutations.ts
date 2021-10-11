import { AuthenticationError } from 'apollo-server-express';
import * as bcrypt from 'bcrypt';
import type { MutationResolvers } from '@/types/graphql';
import type { ResolverContext } from '@/context';

import { database } from '@/services';

export const UserMutations: MutationResolvers<ResolverContext> = {
  createUser: async (_parent, arguments_) => {
    const { email, password, cc, name, displayName, bio } = arguments_;

    if (!email || !password) {
      throw new AuthenticationError('missing_credentials');
    }

    const exisitingUser = await database.user.findUnique({ where: { email } });

    if (exisitingUser) throw new AuthenticationError('user_already_exists');

    const hash = bcrypt.hashSync(password || '', 10);

    let { role } = arguments_;
    if (!role) role = 'SOFTWARE_DEVELOPER';

    return database.user.create({
      data: {
        email,
        cc,
        name,
        displayName,
        bio,
        role,
        verified: false,
        passwordHash: hash,
      },
    });
  },
  verifyUser: async (_parent, arguments_, context) => {
    if (!context?.userId) throw new AuthenticationError('no_auth_token');

    if (context?.userRole !== 'ADMIN') {
      throw new AuthenticationError('no_permission');
    }

    const exisitingUser = await database.user.findUnique({
      where: { email: arguments_.userEmail },
    });

    if (!exisitingUser) throw new AuthenticationError('user_does_not_exist');

    return database.user.update({
      where: { email: arguments_.userEmail },
      data: { verified: true },
    });
  },
};
