import { GraphQLError } from 'graphql';

export function formatError(err: GraphQLError): GraphQLError {
  // @ts-expect-error
  delete err.extension;
  return err;
}
