import { PrismaClient, User } from '@prisma/client';
import { config, Depromisify } from './utils';
import * as jwt from 'jsonwebtoken';

export const prisma = new PrismaClient();

export const context = async ({ req }) => {
  let token: string = req?.headers?.authorization || '';

  if (token) {
    if (token.startsWith('Bearer ')) token = token.split(' ')[1];

    const decoded = jwt.verify(token, config.TOKEN_SECRET);
  }
};

export type Context = Depromisify<typeof context>;
