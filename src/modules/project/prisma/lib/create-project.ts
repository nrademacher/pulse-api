import type { Project, ProjectStage } from '@prisma/client'
import { prisma } from '#internal/services'

interface CreateProject {
  name: string
  description?: string | null
  stage?: ProjectStage | null
  ownerId: string
}

export async function createProject({ name, description, stage, ownerId }: CreateProject): Promise<Project> {
  const exisitingProject = await prisma.project.findUnique({ where: { name } })
  if (exisitingProject) throw new Error('project_already_exists')

  if (!stage) stage = 'PLANNING'

  const data = {
    name: name!,
    description,
    stage,
    ownerId: ownerId!,
  }

  return await prisma.project.create({
    data,
    include: {
      owner: true,
    },
  })
}
