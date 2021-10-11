import { GraphQLError } from 'graphql';
import type { Resolvers } from './types/graphql';
import merge from 'lodash.merge';

export function formatError(err: GraphQLError): GraphQLError {
  // @ts-expect-error
  delete err.extension;
  return err;
}

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
