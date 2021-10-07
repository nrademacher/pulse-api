import { AuthenticationError } from 'apollo-server';
import { Resolvers } from '../../graphql/types';
import { Context } from '../../context';
import { db } from '../../database';

export const UserResolvers: Resolvers<Context> = {
  Query: {
    me: async (_parent, _args, context) => {
      if (!context?.user_id) throw new AuthenticationError('missing_token');

      return db.user.findUnique({ where: { id: context.user_id } });
    },
  },
};
