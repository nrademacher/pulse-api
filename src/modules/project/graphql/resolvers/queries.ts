import type { Project, QueryResolvers, ResolverContext } from '#internal/types'
import { getProjectById, getProjectsByUserId } from '../../prisma'
import { AuthenticationError } from 'apollo-server-express'
import { coerceToAuthError } from '#internal/utils'

export const projectQueries: QueryResolvers<ResolverContext> = {
  projectById: async (_parent, { id }, { userId }) => {
    if (!userId) throw new AuthenticationError('missing_token')

    try {
      return await getProjectById(id)
    } catch (error) {
      coerceToAuthError(error, 'error_retrieving_project_from_db')
    }
  },
  myProjects: async (_parent, _arguments, { userId }) => {
    if (!userId) throw new AuthenticationError('missing_token')

    let projects: Project[] = []

    try {
      projects = await getProjectsByUserId(userId)
    } catch (error) {
      coerceToAuthError(error, 'error_retrieving_projects_from_db')
    }

    return projects
  },
}
