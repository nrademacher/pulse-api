import type { QueryResolvers } from '@/types/graphql';
import type { ResolverContext } from '@/context';

import { LoginQuery } from './login';
import { GetUsersQueries } from './get-users';

export const UserQueries: QueryResolvers<ResolverContext> = {
  ...LoginQuery,
  ...GetUsersQueries,
};
