import type { Project, SubscriptionResolvers } from '#internal/types'
import { pubsub } from '#internal/services'

export const projectSubscriptions: SubscriptionResolvers = {
  subscribeToProjectEvent: {
    subscribe: (_parent, { channel }) => {
      if (!channel) channel = 'PROJECT_CREATED'

      const projectEventIterator = pubsub.asyncIterator([channel])
      return {
        [Symbol.asyncIterator]() {
          return projectEventIterator
        },
      }
    },
    resolve: (payload: Project) => {
      return payload
    },
  },
}
