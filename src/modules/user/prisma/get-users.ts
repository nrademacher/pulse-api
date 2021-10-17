import { AuthenticationError } from 'apollo-server-express';
import { prisma, resolverStore } from '#internal/services';

resolverStore.add('queries', {
  getSelf: async (_parent, _arguments, context) => {
    if (!context?.userId) throw new AuthenticationError('missing_token');

    return prisma.user.findUnique({ where: { id: context.userId } });
  },
  getUserById: async (_parent, arguments_, context) => {
    if (!context?.userId) throw new AuthenticationError('missing_token');

    return prisma.user.findUnique({ where: { id: arguments_.id } });
  },
  getUserByEmail: async (_parent, arguments_, context) => {
    if (!context?.userId) throw new AuthenticationError('missing_token');

    return prisma.user.findUnique({ where: { email: arguments_.email } });
  },
});
