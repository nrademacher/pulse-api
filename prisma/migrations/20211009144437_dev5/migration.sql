/*
  Warnings:

  - You are about to drop the `_ProjectToTeam` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `teamId` to the `projects` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ProjectToTeam" DROP CONSTRAINT "_ProjectToTeam_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProjectToTeam" DROP CONSTRAINT "_ProjectToTeam_B_fkey";

-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "teamId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_ProjectToTeam";

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
