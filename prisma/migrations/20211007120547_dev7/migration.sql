/*
  Warnings:

  - You are about to drop the column `content` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the column `password_hash` on the `users` table. All the data in the column will be lost.
  - Added the required column `role` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `team` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserRoles" AS ENUM ('TEAM_LEAD', 'TEAM_MEMBER');

-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "content",
ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "password_hash",
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "displayName" TEXT,
ADD COLUMN     "passwordHash" TEXT,
ADD COLUMN     "role" "UserRoles" NOT NULL,
ADD COLUMN     "team" TEXT NOT NULL;
