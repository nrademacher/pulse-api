-- AlterTable
ALTER TABLE "users" ADD COLUMN     "name" TEXT,
ALTER COLUMN "passwordHash" DROP NOT NULL,
ALTER COLUMN "verified" DROP NOT NULL;
