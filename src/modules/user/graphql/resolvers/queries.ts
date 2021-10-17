import type { QueryResolvers } from '#internal/types';
import type { ResolverContext } from '#internal/lib';
import {
  getUserByEmail,
  getUserById,
  getUsersByRole,
  loginUser,
} from '../../prisma';
import { catchAuthError } from '#internal/utils';
import { AuthenticationError } from 'apollo-server-express';

export const UserQueries: QueryResolvers<ResolverContext> = {
  login: async (_parent, arguments_) => {
    const { email, password } = arguments_;

    try {
      return await loginUser(email, password);
    } catch (error) {
      catchAuthError(error, 'error_logging_in_user');
    }
  },
  getSelf: async (_parent, _arguments, { userId }) => {
    if (!userId) throw new AuthenticationError('missing_token');

    return await getUserById(userId);
  },
  getUserById: async (_parent, { id }, { userId }) => {
    if (!userId) throw new AuthenticationError('missing_token');

    return await getUserById(id);
  },
  getUserByEmail: async (_parent, { email }, { userId }) => {
    if (!userId) throw new AuthenticationError('missing_token');

    return await getUserByEmail(email);
  },
  getUsersByRole: async (_parent, { role }, { userId }) => {
    if (!userId) throw new AuthenticationError('missing_token');

    return await getUsersByRole(role);
  },
};
