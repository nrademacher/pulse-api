import { prismaTestClient as prisma } from '#internal/services';
import { createUser } from '../../../user/prisma';
import { createProject } from '../lib';

describe('project creation', () => {
  /* afterEach(async () => {
    await prisma.project.deleteMany();
    await prisma.user.deleteMany();
  }); */

  it('creates a new valid project in the database', async () => {
    const newProjectName = 'Test Project';

    const { id } = await createUser({
      email: 'john@itemis.com',
      password: '123313Al;XXX',
      cc: 'ADV_ENG',
    });

    await createProject({
      name: newProjectName,
      ownerId: id,
    });

    const result = await prisma.project.findUnique({
      where: { name: newProjectName },
    });

    expect(result).toHaveProperty('name', newProjectName);
    expect(result).toHaveProperty('stage', 'PLANNING');
    expect(result).toHaveProperty('ownerId', id);
  });

  /* it('rejects a project providing a name that is too short', async () => {
    await expect(
      async () =>
        await createProject({
          email: 'john@itemis.com',
          name: 'J',
          password: '123313Al;XXX',
          cc: 'ADV_ENG',
        }),
    ).rejects.toThrowError('projectname_too_short');
  }); */
});
