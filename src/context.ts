import type { ServerResponse } from 'http'
import * as jwt from 'jsonwebtoken'
import { config } from './utils'

export interface ResolverContext {
  isAuthed: boolean
  userId?: string
}

export const context = async ({ req }: ServerResponse) => {
  const ctx: ResolverContext = {
    isAuthed: false,
  }
  let token: string = req?.headers?.authorization || ''

  if (token) {
    if (token.startsWith('Bearer ')) token = token.split(' ')[1]

    try {
      const decoded = jwt.verify(token, config.TOKEN_SECRET)

      if (typeof decoded === 'string') return ctx

      if (decoded.userId) {
        ctx.isAuthed = true
        ctx.userId = decoded.userId
      }
    } catch (e) {
      //
    }

    return ctx
  }
}
