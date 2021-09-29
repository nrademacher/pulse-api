import { GraphQLError } from 'graphql';

export const config = {
  TOKEN_SECRET: process.env.JWT_SECRET || 'xkanban-jwt-dev-secret',
};

export type Depromisify<T extends (...args: any) => any> = T extends (
  args: any,
) => Promise<infer U>
  ? U
  : T extends (...args: any) => infer U
  ? U
  : any;

export function formatError(err: GraphQLError): GraphQLError {
  // @ts-expect-error
  delete err.extension;
  return err;
}
