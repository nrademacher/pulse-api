import { PubSub } from 'graphql-subscriptions'
import { RedisPubSub } from 'graphql-redis-subscriptions'
import Redis from 'ioredis'

export let pubsub: PubSub | RedisPubSub

if (process.env.DB_ENV === 'test') {
  pubsub = new PubSub()
} else {
  const options = {
    host: process.env.DB_HOST || 'localhost',
    port: 6379,
    retryStrategy: (times: number) => {
      return Math.min(times * 50, 2000)
    },
  }

  pubsub = new RedisPubSub({
    publisher: new Redis(options),
    subscriber: new Redis(options),
  })
}
