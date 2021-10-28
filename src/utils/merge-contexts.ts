import type { Request } from 'express';
import type { SingleModuleContext as Context } from '#internal/modules';
import merge from 'lodash.merge';

type ContextCreationFunction = (req: Request) => Promise<Context>;

export function mergeContexts(
  ...contextCreationFunctions: ContextCreationFunction[]
) {
  return async function ({ req }: { req: Request }) {
    let baseResolverContext = {};

    for (const function_ of contextCreationFunctions) {
      baseResolverContext = merge(baseResolverContext, await function_(req));
    }

    console.log(baseResolverContext);

    return baseResolverContext;
  };
}
