import type { ServerResponse } from 'node:http';

import * as jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';
import { config } from './config';
import { Resolvers } from '#internal/types';

export const resolvers: Resolvers = {};

export interface ResolverContext {
  isAuthed: boolean;
  userId?: string;
  userRole?: string;
}

export async function createResolverContext({ req }: ServerResponse) {
  const resolverContext: ResolverContext = {
    isAuthed: false,
  };

  let token: string = req?.headers?.authorization || '';

  if (token) {
    if (token.startsWith('Bearer ')) token = token.split(' ')[1];

    try {
      const decoded = jwt.verify(token, config.TOKEN_SECRET);

      if (typeof decoded === 'string') return resolverContext;

      if (decoded.userId) {
        resolverContext.isAuthed = true;
        resolverContext.userId = decoded.userId;
        resolverContext.userRole = decoded.userRole;
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'fatal_error_while_decoding_token';

      throw new GraphQLError(message);
    }

    return resolverContext;
  }
}
