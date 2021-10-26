import { prisma } from '#internal/services';
import { validateUserSignup } from '#internal/utils';
import type { CC, UserRoles } from '@prisma/client';
import * as bcrypt from 'bcrypt';

interface SignUp {
  email: string;
  password: string;
  cc: CC;
  role?: UserRoles | null;
  name?: string | null;
  displayName?: string | null;
  bio?: string | null;
}

export async function createUser({
  email,
  password,
  cc,
  name,
  displayName,
  role,
  bio,
}: SignUp) {
  validateUserSignup({ email, password, name });

  const exisitingUser = await prisma.user.findUnique({ where: { email } });
  if (exisitingUser) throw new Error('user_already_exists');

  const hash = bcrypt.hashSync(password || '', 10);

  if (!role) role = 'SOFTWARE_DEVELOPER';

  const data = {
    email,
    cc,
    name,
    displayName,
    bio,
    role,
    verified: false,
    passwordHash: hash,
  };

  return await prisma.user.create({
    data,
  });
}
