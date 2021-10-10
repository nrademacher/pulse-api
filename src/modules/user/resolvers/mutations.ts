import type { Resolvers } from '@/types/graphql'
import type { ResolverContext } from '@/context'

import { AuthenticationError } from 'apollo-server-express'
import { db } from '@/database'
import * as bcrypt from 'bcrypt'
import { PubSub } from 'graphql-subscriptions'

const pubsub = new PubSub()

export const UserMutations: Resolvers<ResolverContext> = {
  Mutation: {
    createUser: async (_parent, args, _context) => {
      const { email, password, name, displayName, bio, role } = args

      if (!email || !password) {
        throw new AuthenticationError('missing_credentials')
      }

      const exisitingUser = await db.user.findUnique({ where: { email } })

      if (exisitingUser) throw new AuthenticationError('failed_to_create_user')

      const hash = bcrypt.hashSync(password || '', 10)

      return await db.user.create({
        data: {
          email,
          passwordHash: hash,
          displayName,
          bio,
          role: role!,
        },
      })
    },
  },
  Subscription: {
    greetings: {
      subscribe: async function* () {
        for (const hi of ['Hi', 'Bonjour', 'Hola', 'Ciao', 'Zdravo']) {
          yield { greetings: hi }
        }
      },
    },
  },
}
