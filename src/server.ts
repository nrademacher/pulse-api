import './alias';
import { ApolloServer } from 'apollo-server';
import { schema } from './schema';
import { context } from './context';
import { formatError } from './utils';

const port = process.env.PORT || 4000;

new ApolloServer({ schema, context, formatError }).listen({ port }, () =>
  console.log(`Server ready at: http://localhost:${port}`),
);
