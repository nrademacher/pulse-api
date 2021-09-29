/*
  Warnings:

  - You are about to drop the column `profileId` on the `collections` table. All the data in the column will be lost.
  - You are about to drop the `profiles` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `collections` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "collections" DROP CONSTRAINT "collections_profileId_fkey";

-- DropForeignKey
ALTER TABLE "profiles" DROP CONSTRAINT "profiles_userId_fkey";

-- AlterTable
ALTER TABLE "collections" DROP COLUMN "profileId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "profiles";

-- AddForeignKey
ALTER TABLE "collections" ADD CONSTRAINT "collections_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
