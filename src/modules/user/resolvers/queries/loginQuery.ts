import type { QueryResolvers } from '@/types/graphql';
import type { ResolverContext } from '@/context';

import { AuthenticationError } from 'apollo-server-express';

import { db } from '@/services';

import * as bcrypt from 'bcrypt';

import * as jwt from 'jsonwebtoken';
import { config } from '@/utils';

export const LoginQuery: QueryResolvers<ResolverContext> = {
  login: async (_parent, args, _context) => {
    if (!args.email || !args.password) {
      throw new AuthenticationError('missing_credentials');
    }

    const user = await db.user.findUnique({ where: { email: args.email } });

    if (!user) throw new AuthenticationError('invalid_credentials');

    const match = await bcrypt.compare(args.password, user.passwordHash!);

    if (!match) throw new AuthenticationError('invalid_credentials');

    return jwt.sign(
      { userId: user.id, userRole: user.role },
      config.TOKEN_SECRET,
    );
  },
};
