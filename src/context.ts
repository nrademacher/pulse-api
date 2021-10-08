import { Http2ServerRequest } from 'http2';
import { config } from './utils';
import * as jwt from 'jsonwebtoken';

export interface ResolverContext {
  isAuthed: boolean;
  userId?: string;
}

export const context = async ({ req }: { req: Http2ServerRequest }) => {
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
