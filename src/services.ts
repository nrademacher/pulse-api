import { PrismaClient } from '@prisma/client';
import { PubSub } from 'graphql-subscriptions';
import { ResolversStore } from './lib';

export const database = new PrismaClient();

export const pubsub = new PubSub();

export const resolversStore = new ResolversStore();
