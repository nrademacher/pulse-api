import type { QueryResolvers, User } from '#internal/types';
import type { ResolverContext } from '#internal/lib';
import {
  getUserByEmail,
  getUserById,
  getUsersByRole,
  loginUser,
  getUsersByCC,
} from '../../prisma';
import { coerceToAuthError } from '#internal/utils';
import { AuthenticationError } from 'apollo-server-express';

export const UserQueries: QueryResolvers<ResolverContext> = {
  login: async (_parent, { email, password }) => {
    if (!email || !password) {
      throw new AuthenticationError('missing_credentials');
    }

    try {
      return await loginUser(email, password);
    } catch (error) {
      coerceToAuthError(error, 'error_logging_in_user');
    }
  },
  self: async (_parent, _arguments, { userId }) => {
    if (!userId) throw new AuthenticationError('missing_token');

    try {
      return await getUserById(userId);
    } catch (error) {
      coerceToAuthError(error, 'error_getting_user');
    }
  },
  userById: async (_parent, { id }, { userId }) => {
    if (!userId) throw new AuthenticationError('missing_token');

    try {
      return await getUserById(id);
    } catch (error) {
      coerceToAuthError(error, 'error_getting_user');
    }
  },
  userByEmail: async (_parent, { email }, { userId }) => {
    if (!userId) throw new AuthenticationError('missing_token');

    try {
      return await getUserByEmail(email);
    } catch (error) {
      coerceToAuthError(error, 'error_getting_user');
    }
  },
  usersByRole: async (_parent, { role }, { userId }) => {
    if (!userId) throw new AuthenticationError('missing_token');

    let users: User[] = [];

    try {
      users = await getUsersByRole(role);
    } catch (error) {
      coerceToAuthError(error, 'error_getting_user');
    }

    return users;
  },
  usersByCC: async (_parent, { cc }, { userId }) => {
    if (!userId) throw new AuthenticationError('missing_token');

    let users: User[] = [];

    try {
      users = await getUsersByCC(cc);
    } catch (error) {
      coerceToAuthError(error, 'error_getting_user');
    }

    return users;
  },
};
