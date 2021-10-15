import type {
  MutationResolvers,
  QueryResolvers,
  Resolvers,
  SubscriptionResolvers,
} from '#internal/types';

import merge from 'lodash.merge';

type ResolverTypeArgs = 'queries' | 'mutations' | 'subscriptions';

type ResolverTypes = QueryResolvers | MutationResolvers | SubscriptionResolvers;

export class ResolversStore {
  private store: Resolvers = {};

  private setStore(resolvers: Resolvers) {
    this.store = resolvers;
  }

  add(resolversType: ResolverTypeArgs, newResolvers: ResolverTypes) {
    const typeStringSliceEndPos = resolversType === 'queries' ? -3 : -1;

    const typePropString =
      resolversType.charAt(0).toUpperCase() +
      resolversType.slice(1, typeStringSliceEndPos);

    const resolvers = { [typePropString]: newResolvers };

    const mergedResolvers = merge(this.store, resolvers);

    this.setStore(mergedResolvers);
  }

  get resolvers() {
    return this.store;
  }
}
