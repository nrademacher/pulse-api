import { prisma } from '#internal/services';

export function getOwnChats(userId: string) {
  if (!userId) throw new Error('missing_token');

  return prisma.chat.findMany({
    where: {
      fromId: userId,
    },
  });
}
