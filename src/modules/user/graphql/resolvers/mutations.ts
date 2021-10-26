import type { MutationResolvers } from '#internal/types';
import type { ResolverContext } from '#internal/lib';
import { createUser, verifyUser } from '../../prisma';
import { AuthenticationError } from 'apollo-server-express';
import { pubsub } from '#internal/services';
import { catchAuthError } from '#internal/utils';

export const UserMutations: MutationResolvers<ResolverContext> = {
  signUpUser: async (_parent, arguments_) => {
    const { email, password, cc, name, displayName, bio, role } = arguments_;

    if (!email || !password) {
      throw new AuthenticationError('missing_credentials');
    }

    try {
      const newUser = await createUser({
        email,
        password,
        cc,
        role,
        name,
        displayName,
        bio,
      });

      pubsub.publish('SIGN_UP', newUser);

      return newUser;
    } catch (error) {
      catchAuthError(error, 'error_creating_user_in_db');
    }
  },
  verifyUser: async (_parent, { userEmail }, { userId, userRole }) => {
    if (!userId) throw new AuthenticationError('no_auth_token');

    if (userRole !== 'ADMIN') throw new AuthenticationError('no_permission');

    try {
      return await verifyUser(userEmail);
    } catch (error) {
      catchAuthError(error, 'error_verifying_user');
    }
  },
};
