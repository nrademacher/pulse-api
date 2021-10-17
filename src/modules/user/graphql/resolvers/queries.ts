import { loginUser } from '../../prisma';
import { catchAuthError } from '#internal/utils';
import { QueryResolvers } from '#internal/types';
import { ResolverContext } from '#internal/lib';

export const UserQueries: QueryResolvers<ResolverContext> = {
  login: async (_parent, arguments_) => {
    const { email, password } = arguments_;

    try {
      return await loginUser(email, password);
    } catch (error) {
      catchAuthError(error, 'error_logging_in_user');
    }
  },
};
