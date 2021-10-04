import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main () {
  /* await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@prisma.io',
      profile: {
        create: {
          bio: 'I like turtles',
          collections: {
            create: [
              {
                title: "Alice's Collection",
                boards: {
                  create: {
                    title: "Alice's Kanban Board",
                    lists: {
                      create: {
                        title: 'TODOS',
                        cards: {
                          create: {
                            title: 'Shopping List',
                            content: 'Milk, butter, bread',
                          },
                        },
                      },
                    },
                  },
                },
              },
            ],
          },
        },
      },
    },
  }); */

  const allUsers = await prisma.profile.findMany({
    include: {
      collections: {
        select: {
          title: true,
          boards: {
            select: {
              title: true,
              id: true,
              lists: {
                select: {
                  title: true,
                  boardId: true,
                  cards: true
                }
              }
            }
          }
        }
      }
    }
  })
  console.dir(allUsers, { depth: null })
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
