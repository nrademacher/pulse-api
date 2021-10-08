-- CreateEnum
CREATE TYPE "TaskPriorities" AS ENUM ('LOW', 'NORMAL', 'HIGH');

-- AlterTable
ALTER TABLE "tasks" ADD COLUMN     "priority" "TaskPriorities" NOT NULL DEFAULT E'NORMAL';
