import { prisma } from '#internal/services';

export async function getUserById(userId: string) {
  return prisma.user.findUnique({ where: { id: userId } });
}

export async function getUserByEmail(userEmail: string) {
  return prisma.user.findUnique({ where: { email: userEmail } });
}
