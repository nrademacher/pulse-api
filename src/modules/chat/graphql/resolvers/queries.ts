import type { QueryResolvers } from '#internal/types';
import { getOwnChats } from '../../prisma';
import { catchAuthError } from '#internal/utils';

export const ChatQueries: QueryResolvers = {
  getOwnChats: async (_parent, _arguments, { userId }) => {
    try {
      return await getOwnChats(userId);
    } catch (error) {
      catchAuthError(error, 'error_retrieving_user_chats_from_db');
    }
  },
};
