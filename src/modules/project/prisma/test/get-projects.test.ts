import { prismaTestClient as prisma } from '#internal/services'
import { createUser } from '../../../user/prisma/lib/create-user'
import { createProject, getProjectById, getProjectsByUserId } from '../lib'

describe('project retrieval', () => {
  afterEach(async () => {
    await prisma.project.deleteMany()
    await prisma.user.deleteMany()
  })

  it('gets a project by id', async () => {
    const { id } = await createUser({
      email: 'john@itemis.com',
      password: '123313Al;XXX',
    })

    const project = await createProject({ ownerId: id, name: 'Hello World Project', description: 'A project to say hello to the world' })

    const retrievedProject = await getProjectById(project.id)

    expect(retrievedProject).toStrictEqual(project)
  })

  it('gets projects by owner id', async () => {
    const { id } = await createUser({
      email: 'john@itemis.com',
      password: '123313Al;XXX',
    })

    const projectOne = await createProject({ ownerId: id, name: 'Hello World Project', description: 'A project to say hello to the world' })
    const projectTwo = await createProject({
      ownerId: id,
      name: 'Another Hello World Project',
      description: 'Another project to say hello to the world',
    })

    const retrievedProjects = await getProjectsByUserId(id)

    expect(retrievedProjects).toStrictEqual([projectOne, projectTwo])
  })
})
