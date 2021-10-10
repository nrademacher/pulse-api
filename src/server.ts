import './alias';
import express from 'express';
import { createServer } from 'http';
import { ApolloServer } from 'apollo-server-express';
import { execute, subscribe } from 'graphql';
import { schema } from './schema';
import { context } from './context';
import { formatError } from './utils';
import { SubscriptionServer } from 'subscriptions-transport-ws';

(async function () {
  const app = express();

  const httpServer = createServer(app);

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

  const subscriptionServer = SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
    },
    {
      server: httpServer,
      path: apolloServer.graphqlPath,
    },
  );

  const port = process.env.PORT || 4000;

  httpServer.listen(port, function () {
    console.log(`Express running on port ${port}`);
    console.log(
      `GraphQl server at http://localhost:${port}${apolloServer.graphqlPath}`,
    );
  });
})();
