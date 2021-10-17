import type { UserRoles } from '@prisma/client';
import { prisma } from '#internal/services';

interface VerifyUser {
  userEmail: string;
  userRole?: UserRoles;
}

export async function verifyUser({ userRole, userEmail }: VerifyUser) {
  if (userRole !== 'ADMIN') {
    throw new Error('no_permission');
  }

  const exisitingUser = await prisma.user.findUnique({
    where: { email: userEmail },
  });

  if (!exisitingUser) throw new Error('user_does_not_exist');

  return prisma.user.update({
    where: { email: userEmail },
    data: { verified: true },
  });
}
