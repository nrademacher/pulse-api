import { PrismaClient } from '@prisma/client';
import { PubSub } from 'graphql-subscriptions';

export const database = new PrismaClient();

export const pubsub = new PubSub();
