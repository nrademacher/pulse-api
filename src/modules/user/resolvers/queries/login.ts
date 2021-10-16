import { AuthenticationError } from 'apollo-server-express';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { database, resolversStore } from '#internal/services';
import { config } from '#internal/lib';

resolversStore.add('queries', {
  login: async (_parent, arguments_) => {
    if (!arguments_.email || !arguments_.password) {
      throw new AuthenticationError('missing_credentials');
    }

    const user = await database.user.findUnique({
      where: { email: arguments_.email },
    });

    if (!user) throw new AuthenticationError('invalid_credentials');

    const match = await bcrypt.compare(arguments_.password, user.passwordHash);

    if (!match) throw new AuthenticationError('invalid_credentials');

    return jwt.sign(
      { userId: user.id, userRole: user.role },
      config.TOKEN_SECRET,
    );
  },
});
