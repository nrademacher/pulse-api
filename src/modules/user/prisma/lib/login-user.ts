import { prisma } from '#internal/services'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { config } from '#internal/lib'

export async function loginUser(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user) throw new Error('invalid_credentials')

  const match = await compare(password, user.passwordHash)

  if (!match) throw new Error('invalid_credentials')

  return sign({ userId: user.id, userRole: user.role }, config.TOKEN_SECRET)
}
