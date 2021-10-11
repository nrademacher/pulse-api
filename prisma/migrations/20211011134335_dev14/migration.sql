/*
  Warnings:

  - The values [PUBLIC] on the enum `ChatChannels` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ChatChannels_new" AS ENUM ('ALL', 'ADV_ENG', 'CES', 'IOT', 'PRIVATE');
ALTER TABLE "chats" ALTER COLUMN "channel" DROP DEFAULT;
ALTER TABLE "chats" ALTER COLUMN "channel" TYPE "ChatChannels_new" USING ("channel"::text::"ChatChannels_new");
ALTER TYPE "ChatChannels" RENAME TO "ChatChannels_old";
ALTER TYPE "ChatChannels_new" RENAME TO "ChatChannels";
DROP TYPE "ChatChannels_old";
ALTER TABLE "chats" ALTER COLUMN "channel" SET DEFAULT 'ALL';
COMMIT;

-- AlterTable
ALTER TABLE "chats" ALTER COLUMN "channel" SET DEFAULT E'ALL';
