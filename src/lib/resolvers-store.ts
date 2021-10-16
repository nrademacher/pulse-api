import type {
  QueryResolvers,
  MutationResolvers,
  SubscriptionResolvers,
  Resolvers,
} from '#internal/types';
import merge from 'lodash.merge';

type ResolverTypeArguments = 'queries' | 'mutations' | 'subscriptions';
type ResolverTypes = QueryResolvers | MutationResolvers | SubscriptionResolvers;

export class ResolversStore {
  private store: Resolvers = {};

  private setStore(resolvers: Resolvers) {
    this.store = resolvers;
  }

  add(resolversType: ResolverTypeArguments, newResolvers: ResolverTypes) {
    const typeStringEndSlice =
      resolversType === 'queries'
        ? resolversType.slice(1, -3) + 'y'
        : resolversType.slice(1, -1);

    const typePropertyString =
      resolversType.charAt(0).toUpperCase() + typeStringEndSlice;

    const resolvers = { [typePropertyString]: newResolvers };

    const mergedResolvers = merge(this.store, resolvers);

    this.setStore(mergedResolvers);
  }

  get resolvers() {
    return this.store;
  }
}
