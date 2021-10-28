import type { Chat, QueryResolvers, ResolverContext } from '#internal/types';
import { getMessage, getAllChats, getUserChats } from '../../prisma';
import { AuthenticationError } from 'apollo-server-express';
import { coerceToAuthError } from '#internal/utils';

export const ChatQueries: QueryResolvers<ResolverContext> = {
  message: async (_parent, { id }, { userId }) => {
    if (!userId) throw new AuthenticationError('missing_token');

    try {
      return await getMessage(id);
    } catch (error) {
      coerceToAuthError(error, 'error_retrieving_user_chats_from_db');
    }
  },
  allChats: async (_parent, _arguments, { userId }) => {
    if (!userId) throw new AuthenticationError('missing_token');

    let chats: Chat[] = [];

    try {
      chats = await getAllChats();
    } catch (error) {
      coerceToAuthError(error, 'error_retrieving_user_chats_from_db');
    }

    return chats;
  },
  ownChats: async (_parent, _arguments, { userId }) => {
    if (!userId) throw new AuthenticationError('missing_token');

    let chats: Chat[] = [];

    try {
      chats = await getUserChats(userId);
    } catch (error) {
      coerceToAuthError(error, 'error_retrieving_user_chats_from_db');
    }

    return chats;
  },
  chatsFromUser: async (_parent, { id }, { userId }) => {
    if (!userId) throw new AuthenticationError('missing_token');

    let chats: Chat[] = [];

    try {
      chats = await getUserChats(id);
    } catch (error) {
      coerceToAuthError(error, 'error_retrieving_user_chats_from_db');
    }

    return chats;
  },
};
