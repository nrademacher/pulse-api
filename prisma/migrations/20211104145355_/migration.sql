/*
  Warnings:

  - Added the required column `stage` to the `projects` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ProjectStage" AS ENUM ('PLANNING', 'PREPARATION', 'IN_PROGRESS', 'DONE');

-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "stage" "ProjectStage" NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;
