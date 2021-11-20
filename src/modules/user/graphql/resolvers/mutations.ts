import type { MutationResolvers, ResolverContext } from '#internal/types'
import { changeUserBio, changeUserDisplayName, changeUserRole, createUser, verifyUser } from '../../prisma'
import { AuthenticationError } from 'apollo-server-express'
import { pubsub } from '#internal/services'
import { coerceToAuthError } from '#internal/utils'

export const userMutations: MutationResolvers<ResolverContext> = {
  signUpUser: async (_parent, arguments_) => {
    const { email, password, cc, name, displayName, bio, role } = arguments_

    if (!email || !password) {
      throw new AuthenticationError('missing_credentials')
    }

    try {
      const newUser = await createUser({
        email,
        password,
        cc,
        role,
        name,
        displayName,
        bio,
      })

      pubsub.publish('SIGN_UP', newUser)

      return newUser
    } catch (error) {
      coerceToAuthError(error, 'error_creating_user_in_db')
    }
  },
  verifyUser: async (_parent, { userEmail }, { userId, userRole }) => {
    if (!userId) throw new AuthenticationError('no_auth_token')

    if (userRole !== 'ADMIN') throw new AuthenticationError('no_permission')

    try {
      return await verifyUser(userEmail)
    } catch (error) {
      coerceToAuthError(error, 'error_verifying_user')
    }
  },
  changeUserRole: async (_parent, { userEmail, newRole }, { userId, userRole }) => {
    if (!userId) throw new AuthenticationError('no_auth_token')

    if (userRole !== 'ADMIN') throw new AuthenticationError('no_permission')

    try {
      return await changeUserRole(userEmail, newRole)
    } catch (error) {
      coerceToAuthError(error, 'error_changing_user_role')
    }
  },
  changeUserBio: async (_parent, { newBio }, { userId }) => {
    if (!userId) throw new AuthenticationError('no_auth_token')

    try {
      return await changeUserBio(userId, newBio)
    } catch (error) {
      coerceToAuthError(error, 'error_changing_user_bio')
    }
  },
  changeUserDisplayName: async (_parent, { newDisplayName }, { userId }) => {
    if (!userId) throw new AuthenticationError('no_auth_token')

    try {
      return await changeUserDisplayName(userId, newDisplayName)
    } catch (error) {
      coerceToAuthError(error, 'error_changing_user_display_name')
    }
  },
}
