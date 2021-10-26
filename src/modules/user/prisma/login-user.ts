import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { prisma } from '#internal/services';
import { config } from '#internal/lib';

export async function loginUser(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) throw new Error('invalid_credentials');

  const match = await bcrypt.compare(password, user.passwordHash);

  if (!match) throw new Error('invalid_credentials');

  return jwt.sign(
    { userId: user.id, userRole: user.role },
    config.TOKEN_SECRET,
  );
}
