import { PrismaClient } from '@prisma/client'
import { PubSub } from 'graphql-subscriptions'

export const prisma = new PrismaClient()
export const prismaTestClient = new PrismaClient()

export const pubsub = new PubSub()
