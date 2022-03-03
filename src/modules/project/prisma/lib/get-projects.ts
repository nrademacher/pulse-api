import { prisma } from '#internal/services'

export async function getProjectById(projectId: string) {
    return await prisma.project.findUnique({
        where: {
            id: projectId,
        },
        include: {
            owner: true,
        },
    })
}

export async function getProjectsByUserId(userId: string) {
    return await prisma.project.findMany({
        where: {
            ownerId: userId,
        },
        include: {
            owner: true,
        },
    })
}
