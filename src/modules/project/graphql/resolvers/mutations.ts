import type { MutationResolvers, ResolverContext } from '#internal/types'
import { createProject } from '../../prisma'
import { AuthenticationError } from 'apollo-server-express'
import { pubsub } from '#internal/services'

export const projectMutations: MutationResolvers<ResolverContext> = {
    createProject: async (_parent, arguments_, { userId }) => {
        if (!userId) throw new AuthenticationError('missing_token')

        const newProject = await createProject({ ...arguments_ })

        pubsub.publish('PROJECT_CREATED', newProject)

        return newProject
    },
}
