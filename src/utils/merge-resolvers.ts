import merge from 'lodash.merge';
import type { Resolvers } from '#internal/types/graphql';

export function mergeResolvers(...resolversArray: Resolvers[]): Resolvers {
  if (resolversArray.length === 1) {
    return resolversArray[0];
  }

  let merged: Resolvers = {};

  for (const resolvers of resolversArray) {
    merged = merge(merged, resolvers);
  }

  return merged;
}
