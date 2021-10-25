-- CreateTable
CREATE TABLE "_ProjectToParticipants" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProjectToParticipants_AB_unique" ON "_ProjectToParticipants"("A", "B");

-- CreateIndex
CREATE INDEX "_ProjectToParticipants_B_index" ON "_ProjectToParticipants"("B");

-- AddForeignKey
ALTER TABLE "_ProjectToParticipants" ADD FOREIGN KEY ("A") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectToParticipants" ADD FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
