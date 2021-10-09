import type { Http2ServerRequest } from 'http2';

export type ContextRequest = {
  req: Http2ServerRequest;
};

export interface ResolverContext {
  isAuthed: boolean;
  userId?: string;
}
