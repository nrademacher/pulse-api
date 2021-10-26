import { PrismaClient } from '@prisma/client';
import { PubSub } from 'graphql-subscriptions';

export const prisma = new PrismaClient();

export const pubsub = new PubSub();

const prismaTestClient = new PrismaClient();

export default prismaTestClient;
