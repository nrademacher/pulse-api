import type { QueryResolvers, ResolverContext } from '#internal/types'
import { getProjectById, getProjectsByUserId } from '../../prisma'
import { AuthenticationError } from 'apollo-server-express'

export const projectQueries: QueryResolvers<ResolverContext> = {
    projectById: async (_parent, { id }, { userId }) => {
        if (!userId) throw new AuthenticationError('missing_token')

        return await getProjectById(id)
    },
    myProjects: async (_parent, _arguments, { userId }) => {
        if (!userId) throw new AuthenticationError('missing_token')

        return await getProjectsByUserId(userId)
    },
}
