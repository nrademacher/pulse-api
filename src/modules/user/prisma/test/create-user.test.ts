import { prismaTestClient as prisma } from '#internal/services';
import { createUser } from '../lib';

afterAll(async () => {
  await prisma.user.deleteMany();
});

describe('user creation', () => {
  it('creates a new user in the database', async () => {
    await createUser({
      email: 'john@itemis.com',
      role: 'ADMIN',
      password: '123313Al;XXX',
      cc: 'ADV_ENG',
    });

    const result = await prisma.user.findUnique({
      where: { email: 'john@itemis.com' },
    });

    expect(result).toHaveProperty('email', 'john@itemis.com');
    expect(result).toHaveProperty('role', 'ADMIN');
    expect(result).toHaveProperty('cc', 'ADV_ENG');
  });
});
