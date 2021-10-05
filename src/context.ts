import { Http2ServerRequest } from 'http2';
import { config, Depromisify } from './utils';
import * as jwt from 'jsonwebtoken';

export interface ResolverContext {
  is_authed: boolean;
  user_id?: string;
}

export const context = async ({ req }: { req: Http2ServerRequest }) => {
  const ctx: ResolverContext = {
    is_authed: false,
  };
  let token: string = req?.headers?.authorization || '';

  if (token) {
    if (token.startsWith('Bearer ')) token = token.split(' ')[1];

    const decoded = jwt.verify(token, config.TOKEN_SECRET);

    if (typeof decoded === 'string') return ctx;

    if (decoded.user_id) {
      ctx.is_authed = true;
      ctx.user_id = decoded.user_id;
    }
  }
};

export type Context = Depromisify<typeof context>;
