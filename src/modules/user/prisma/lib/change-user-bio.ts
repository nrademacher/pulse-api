import { prisma } from '#internal/services';
import type { UserRoles } from '@prisma/client';

export async function changeUserRole(
  userEmail: string,
  newUserRole: UserRoles,
) {
  const exisitingUser = await prisma.user.findUnique({
    where: { email: userEmail },
  });

  if (!exisitingUser) throw new Error('user_does_not_exist');

  return await prisma.user.update({
    where: { email: userEmail },
    data: { role: newUserRole },
  });
}
