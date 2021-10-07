/*
  Warnings:

  - The values [TEAM_LEAD,TEAM_MEMBER] on the enum `UserRoles` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "UserRoles_new" AS ENUM ('PROJECT_MANAGER', 'TECHNICAL_LEAD', 'SOFTWARE_DEVELOPER');
ALTER TABLE "users" ALTER COLUMN "role" TYPE "UserRoles_new" USING ("role"::text::"UserRoles_new");
ALTER TYPE "UserRoles" RENAME TO "UserRoles_old";
ALTER TYPE "UserRoles_new" RENAME TO "UserRoles";
DROP TYPE "UserRoles_old";
COMMIT;
