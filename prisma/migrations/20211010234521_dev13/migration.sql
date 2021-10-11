-- CreateEnum
CREATE TYPE "ChatChannels" AS ENUM ('PUBLIC', 'PRIVATE');

-- AlterTable
ALTER TABLE "chats" ADD COLUMN     "channel" "ChatChannels" NOT NULL DEFAULT E'PUBLIC',
ADD COLUMN     "toId" TEXT;

-- AddForeignKey
ALTER TABLE "chats" ADD CONSTRAINT "chats_toId_fkey" FOREIGN KEY ("toId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
