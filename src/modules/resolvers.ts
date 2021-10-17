import type { Resolvers } from '#internal/types';
import { mergeResolvers } from '#internal/utils';
import { UserResolvers } from './user';
import { ChatResolvers } from './chat';

export const resolvers: Resolvers = mergeResolvers(
  UserResolvers,
  ChatResolvers,
);
