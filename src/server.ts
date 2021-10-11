/* import express from 'express';

import { schema } from './schema';
import { context } from './context';
import { formatError } from './utils';

import ws from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';

import { config } from './config'; */

/* export async function server() {
  const app = express();

  const apolloServer = new ApolloServer({ schema, context, formatError });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app });

  const server = app.listen(config.PORT, () => {
    const wsServer = new ws.Server({
      server,
      path: '/graphql',
    });

    useServer({ schema, context }, wsServer);

    console.log(`Express running on port ${config.PORT}`);
    console.log(
      `GraphQl server at http://localhost:${config.PORT}${apolloServer.graphqlPath}`,
    );
  });
} */

import express from 'express';
import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';
import { ApolloServer } from 'apollo-server-express';
import { schema } from './schema';
import { context } from './context';
import { formatError } from './utils';
import { config } from './utils';

export async function server() {
  const app = express();

  const httpServer = createServer(app);

  const subscriptionServer = SubscriptionServer.create(
    { schema, execute, subscribe },
    { server: httpServer, path: '/graphql' },
  );

  const apolloServer = new ApolloServer({
    schema,
    context,
    formatError,
    plugins: [
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            },
          };
        },
      },
    ],
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app });

  httpServer.listen(config.PORT, () => {
    console.log(`Express running on port ${config.PORT}`);
    console.log(
      `GraphQl server at http://localhost:${config.PORT}${apolloServer.graphqlPath}`,
    );
  });
}
