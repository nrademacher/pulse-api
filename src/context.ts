import type { ServerResponse } from 'http';

import * as jwt from 'jsonwebtoken';
import { config } from './lib';

import { GraphQLError } from 'graphql';

export interface ResolverContext {
  isAuthed: boolean;
  userId?: string;
  userRole?: string;
}

export const context = async ({ req }: ServerResponse) => {
  const ctx: ResolverContext = {
    isAuthed: false,
  };

  let token: string = req?.headers?.authorization || '';

  if (token) {
    if (token.startsWith('Bearer ')) token = token.split(' ')[1];

    try {
      const decoded = jwt.verify(token, config.TOKEN_SECRET);

      if (typeof decoded === 'string') return ctx;

      if (decoded.userId) {
        ctx.isAuthed = true;
        ctx.userId = decoded.userId;
        ctx.userRole = decoded.userRole;
      }
    } catch (error) {
      let message;

      if (error instanceof Error) {
        message = error.message;
      } else {
        message = 'error_decoding_token';
      }

      throw new GraphQLError(message);
    }

    return ctx;
  }
};
