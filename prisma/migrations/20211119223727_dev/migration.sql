/*
  Warnings:

  - You are about to drop the column `teamId` on the `projects` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "projects" DROP CONSTRAINT "projects_teamId_fkey";

-- AlterTable
ALTER TABLE "projects" DROP COLUMN "teamId";
