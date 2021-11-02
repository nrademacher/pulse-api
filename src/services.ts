import { PrismaClient } from '@prisma/client';
import { PubSub } from 'graphql-subscriptions';
import Redis from 'ioredis';

export const prisma = new PrismaClient();
export const prismaTestClient = new PrismaClient();

export const pubsub = new PubSub();

export const redis = new Redis(6379);
