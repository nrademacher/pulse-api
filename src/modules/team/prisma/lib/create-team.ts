import type { Team } from '@prisma/client'
import { prisma } from '#internal/services'

interface CreateTeam {
  name: string
  description?: string | null
}

export async function createTeam({ name, description }: CreateTeam): Promise<Team> {
  const exisitingTeam = await prisma.project.findUnique({ where: { name } })
  if (exisitingTeam) throw new Error('team_already_exists')

  return await prisma.team.create({
    data: {
      name,
      description,
    },
  })
}
