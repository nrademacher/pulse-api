import { prisma } from '../src/services';
import { createUser } from '#internal/modules/user/resolvers/mutations/create-user';

beforeAll(async () => {
  await prisma.user.deleteMany();
});

afterAll(async () => {
  await prisma.user.deleteMany();
});

describe('user creation', () => {
  it('creates a new user in the prisma', async () => {
    await createUser({
      email: 'john@doe.com',
      role: 'ADMIN',
      password: '123313',
      cc: 'ADV_ENG',
    });

    const result = await prisma.user.findUnique({
      where: { email: 'john@doe.com' },
    });

    expect(result).toHaveProperty('email', 'john@doe.com');
    expect(result).toHaveProperty('role', 'ADMIN');
    expect(result).toHaveProperty('cc', 'ADV_ENG');
  });
});
