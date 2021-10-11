import type { QueryResolvers } from '@/types/graphql';
import type { ResolverContext } from '@/context';

import { LoginQuery } from './loginQuery';
import { GetUserQueries } from './getUserQueries';

export const UserQueries: QueryResolvers<ResolverContext> = {
  ...LoginQuery,
  ...GetUserQueries,
};
