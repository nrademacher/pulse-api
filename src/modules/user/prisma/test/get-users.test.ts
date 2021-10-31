import { prismaTestClient as prisma } from '#internal/services';
import {
  createUser,
  getUserByEmail,
  getUserById,
  getUsersByCC,
  getUsersByRole,
} from '../lib';

describe('user retrieval', () => {
  afterEach(async () => {
    await prisma.user.deleteMany();
  });

  it('gets a user by id', async () => {
    const user = await createUser({
      email: 'john@itemis.com',
      password: '123313Al;XXX',
      cc: 'ADV_ENG',
    });

    const retrievedUser = await getUserById(user.id);

    expect(retrievedUser).toStrictEqual(user);
  });

  it('gets a user by email', async () => {
    const user = await createUser({
      email: 'john@itemis.com',
      password: '123313Al;XXX',
      cc: 'ADV_ENG',
    });

    const retrievedUser = await getUserByEmail(user.email);

    expect(retrievedUser).toStrictEqual(user);
  });

  it('gets multiple users by role', async () => {
    const userOne = await createUser({
      email: 'john@itemis.com',
      password: '123313Al;XXX',
      role: 'TECHNICAL_LEAD',
      cc: 'ADV_ENG',
    });

    const userTwo = await createUser({
      email: 'jane@itemis.com',
      password: 'dhadu9.!@!@FFF',
      role: 'TECHNICAL_LEAD',
      cc: 'ADV_ENG',
    });

    const retrievedUsers = await getUsersByRole('TECHNICAL_LEAD');

    expect(retrievedUsers).toStrictEqual([userOne, userTwo]);
  });

  it('gets multiple users by CC', async () => {
    const userOne = await createUser({
      email: 'john@itemis.com',
      password: '123313Al;XXX',
      cc: 'CES',
    });

    const userTwo = await createUser({
      email: 'jane@itemis.com',
      password: 'dhadu9.!@!@FFF',
      cc: 'CES',
    });

    const retrievedUsers = await getUsersByCC('CES');

    expect(retrievedUsers).toStrictEqual([userOne, userTwo]);
  });
});
