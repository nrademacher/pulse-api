import { PrismaClient } from '@prisma/client';
import { PubSub } from 'graphql-subscriptions';

export const db = new PrismaClient();

export const pubsub = new PubSub();
