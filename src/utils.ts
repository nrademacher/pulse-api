import { GraphQLError } from 'graphql'

export const config = {
  TOKEN_SECRET: process.env.JWT_SECRET || 'xkanban-jwt-dev-secret'
}

export function formatError (err: GraphQLError): GraphQLError {
  // @ts-expect-error
  delete err.extension
  return err
}
