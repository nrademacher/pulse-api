import { Resolvers } from '../../graphql/types';
import { Context } from '../../context';
import { db } from '../../database';

export const UserResolvers: Resolvers<Context> = {
  Query: {
    me: async (parent, args, context) => {
      return db.user.findUnique({ where: { id: context.user_id } });
    },
  },
};
