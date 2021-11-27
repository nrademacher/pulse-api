import { RedisPubSub } from 'graphql-redis-subscriptions'
import Redis from 'ioredis'

const options = {
  host: process.env.DB_HOST || 'localhost',
  port: 6379,
  /* retryStrategy: (times: number) => {
    return Math.min(times * 50, 2000)
  }, */
}

export const pubsub = new RedisPubSub({
  publisher: new Redis(options),
  subscriber: new Redis(options),
})
