/*
  Warnings:

  - You are about to drop the column `userId` on the `Collection` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Collection" DROP CONSTRAINT "Collection_userId_fkey";

-- AlterTable
ALTER TABLE "Collection" DROP COLUMN "userId";
