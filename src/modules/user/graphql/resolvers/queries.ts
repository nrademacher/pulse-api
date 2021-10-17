import type { QueryResolvers } from '#internal/types';
import type { ResolverContext } from '#internal/lib';
import { getUserByEmail, getUserById, loginUser } from '../../prisma';
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
  getSelf: async (_parent, _arguments, context) => {
    if (!context?.userId) throw new AuthenticationError('missing_token');

    return await getUserById(context.userId);
  },
  getUserById: async (_parent, arguments_, context) => {
    if (!context?.userId) throw new AuthenticationError('missing_token');

    return await getUserById(arguments_.id);
  },
  getUserByEmail: async (_parent, arguments_, context) => {
    if (!context?.userId) throw new AuthenticationError('missing_token');

    return await getUserByEmail(arguments_.email);
  },
};
