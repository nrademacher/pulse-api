import type { Resolvers } from '@/types/graphql';
import type { ResolverContext } from '@/types/context';

import { UserQueries } from './queries';
import { UserMutations } from './mutations';

export const UserResolvers: Resolvers<ResolverContext> = {
  ...UserQueries,
  ...UserMutations,
};
