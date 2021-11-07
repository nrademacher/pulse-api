import type { CC, User, UserRoles } from '@prisma/client';
import { validateUserSignup } from '../utils';
import { prisma } from '#internal/services';
import { hashSync } from 'bcrypt';

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
}: SignUp): Promise<User> {
  validateUserSignup({ email, password, name });

  const exisitingUser = await prisma.user.findUnique({ where: { email } });
  if (exisitingUser) throw new Error('user_already_exists');

  const passwordHash = hashSync(password || '', 10);

  if (!role) role = 'SOFTWARE_DEVELOPER';

  const data = {
    email,
    cc,
    name,
    displayName,
    bio,
    role,
    passwordHash,
    verified: false,
  };

  return await prisma.user.create({
    data,
  });
}
