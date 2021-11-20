import { prismaTestClient as prisma } from '#internal/services'
import { createUser, loginUser } from '../lib'
import isJWT from 'validator/lib/isJWT'

describe('user login', () => {
  afterEach(async () => {
    await prisma.user.deleteMany()
  })

  it('logs in a user providing valid credentials', async () => {
    await createUser({
      email: 'john@itemis.com',
      password: '123313Al;XXX',
      cc: 'ADV_ENG',
    })

    const loginToken = await loginUser('john@itemis.com', '123313Al;XXX')

    expect(isJWT(loginToken)).toBe(true)
  })

  it('rejects logging in a user providing credentials not matching any user', async () => {
    await expect(async () => await loginUser('john@itemis.com', '123313Al;XXX')).rejects.toThrowError('invalid_credentials')
  })

  it('rejects logging in a user providing an existing email with a wrong password', async () => {
    await createUser({
      email: 'john@itemis.com',
      password: '123313Al;XXX',
      cc: 'ADV_ENG',
    })

    await expect(async () => await loginUser('john@itemis.com', '383d18e')).rejects.toThrowError('invalid_credentials')
  })
})
