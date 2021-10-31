import { prismaTestClient as prisma } from '#internal/services';
import { createUser } from '../lib';

describe('user creation', () => {
  afterEach(async () => {
    await prisma.user.deleteMany();
  });

  it('creates a new valid user in the database', async () => {
    await createUser({
      email: 'john@itemis.com',
      password: '123313Al;XXX',
      cc: 'ADV_ENG',
    });

    const result = await prisma.user.findUnique({
      where: { email: 'john@itemis.com' },
    });

    expect(result).toHaveProperty('email', 'john@itemis.com');
    expect(result).toHaveProperty('role', 'SOFTWARE_DEVELOPER');
    expect(result).toHaveProperty('cc', 'ADV_ENG');
  });

  it('rejects creating the user if user with same email exists', async () => {
    await createUser({
      email: 'john@itemis.com',
      password: '123313Al;XXX',
      cc: 'ADV_ENG',
    });

    await expect(
      async () =>
        await createUser({
          email: 'john@itemis.com',
          name: 'John',
          password: '123313Al;XXX',
          cc: 'CES',
        }),
    ).rejects.toThrowError('user_already_exists');
  });

  it('rejects a user providing a name that is too short', async () => {
    await expect(
      async () =>
        await createUser({
          email: 'john@itemis.com',
          name: 'J',
          password: '123313Al;XXX',
          cc: 'ADV_ENG',
        }),
    ).rejects.toThrowError('username_too_short');
  });

  it('rejects a user providing a name that is too long', async () => {
    await expect(
      async () =>
        await createUser({
          email: 'john@itemis.com',
          name: 'J'.repeat(65),
          password: '123313Al;XXX',
          cc: 'ADV_ENG',
        }),
    ).rejects.toThrowError('username_too_long');
  });

  it('rejects a user providing an invalid email address', async () => {
    await expect(
      async () =>
        await createUser({
          email: '@itemis.com',
          password: '123313Al;XXX',
          cc: 'ADV_ENG',
        }),
    ).rejects.toThrowError('invalid_email_address');

    await expect(
      async () =>
        await createUser({
          email: 'john@itemis',
          password: '123313Al;XXX',
          cc: 'ADV_ENG',
        }),
    ).rejects.toThrowError('invalid_email_address');
  });

  it('rejects a user providing a non-itemis email', async () => {
    await expect(
      async () =>
        await createUser({
          email: 'john@test.com',
          role: 'ADMIN',
          password: '123313Al;XXX',
          cc: 'ADV_ENG',
        }),
    ).rejects.toThrowError('signup_requires_itemis_email_address');
  });

  it('rejects a user providing a weak password', async () => {
    await expect(
      async () =>
        await createUser({
          email: 'john@itemis.com',
          password: 'password',
          cc: 'ADV_ENG',
        }),
    ).rejects.toThrowError('insufficient_password_strength');

    await expect(
      async () =>
        await createUser({
          email: 'john@itemis.com',
          password: '12345678',
          cc: 'ADV_ENG',
        }),
    ).rejects.toThrowError('insufficient_password_strength');
  });
});
