import type { Project, SubscriptionResolvers } from '#internal/types'
import { pubsub } from '#internal/services'

export const projectSubscriptions: SubscriptionResolvers = {
  subscribeToProjectEvent: {
    subscribe: (_parent, { channel }) => {
      if (!channel) channel = 'PROJECT_CREATED'

      return pubsub.asyncIterator([channel])
    },
    resolve: (payload: Project) => {
      return payload
    },
  },
}
