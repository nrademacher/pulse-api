import type { Resolvers } from '@/types/graphql';

import merge from 'lodash.merge';

export function mergeResolvers(...resolversArr: Resolvers[]): Resolvers {
  if (resolversArr.length === 1) {
    return resolversArr[0];
  }

  let merged: Resolvers = {};

  for (const resolvers of resolversArr) {
    merged = merge(merged, resolvers);
  }

  return merged;
}
