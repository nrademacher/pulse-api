/*
  Warnings:

  - You are about to drop the column `cc` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "cc";

-- DropEnum
DROP TYPE "CC";
