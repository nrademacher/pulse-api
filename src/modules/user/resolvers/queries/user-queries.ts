import type { QueryResolvers } from '#internal/types/graphql';
import type { ResolverContext } from '#internal/lib';

import { LoginQuery } from './login';
import { GetUsersQueries } from './get-users';

export const UserQueries: QueryResolvers<ResolverContext> = {
  ...LoginQuery,
  ...GetUsersQueries,
};