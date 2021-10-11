import type { ServerResponse } from 'node:http';

import * as jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';
import { config } from './lib';

export interface ResolverContext {
  isAuthed: boolean;
  userId?: string;
  userRole?: string;
}

export const context = async ({ req }: ServerResponse) => {
  const context_: ResolverContext = {
    isAuthed: false,
  };

  let token: string = req?.headers?.authorization || '';

  if (token) {
    if (token.startsWith('Bearer ')) token = token.split(' ')[1];

    try {
      const decoded = jwt.verify(token, config.TOKEN_SECRET);

      if (typeof decoded === 'string') return context_;

      if (decoded.userId) {
        context_.isAuthed = true;
        context_.userId = decoded.userId;
        context_.userRole = decoded.userRole;
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'fatal_error_while_decoding_token';

      throw new GraphQLError(message);
    }

    return context_;
  }
};
