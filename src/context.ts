import type { ContextRequest, ResolverContext } from './types/context';
import * as jwt from 'jsonwebtoken';
import { config } from './utils';

export const context = async ({ req }: ContextRequest) => {
  const ctx: ResolverContext = {
    isAuthed: false,
  };
  let token: string = req?.headers?.authorization || '';

  if (token) {
    if (token.startsWith('Bearer ')) token = token.split(' ')[1];

    const decoded = jwt.verify(token, config.TOKEN_SECRET);

    if (typeof decoded === 'string') return ctx;

    if (decoded.userId) {
      ctx.isAuthed = true;
      ctx.userId = decoded.userId;
    }

    return ctx;
  }
};
