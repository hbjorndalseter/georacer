/*
  Warnings:

  - You are about to drop the column `completed_question` on the `Player` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Player" DROP COLUMN "completed_question";

-- CreateTable
CREATE TABLE "_completedSpacialQuestions" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_completedSpacialQuestions_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_completedRiddleQuestions" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_completedRiddleQuestions_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_completedFactQuestions" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_completedFactQuestions_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_completedSpacialQuestions_B_index" ON "_completedSpacialQuestions"("B");

-- CreateIndex
CREATE INDEX "_completedRiddleQuestions_B_index" ON "_completedRiddleQuestions"("B");

-- CreateIndex
CREATE INDEX "_completedFactQuestions_B_index" ON "_completedFactQuestions"("B");

-- AddForeignKey
ALTER TABLE "_completedSpacialQuestions" ADD CONSTRAINT "_completedSpacialQuestions_A_fkey" FOREIGN KEY ("A") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_completedSpacialQuestions" ADD CONSTRAINT "_completedSpacialQuestions_B_fkey" FOREIGN KEY ("B") REFERENCES "SpacialQuestion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_completedRiddleQuestions" ADD CONSTRAINT "_completedRiddleQuestions_A_fkey" FOREIGN KEY ("A") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_completedRiddleQuestions" ADD CONSTRAINT "_completedRiddleQuestions_B_fkey" FOREIGN KEY ("B") REFERENCES "RiddleQuestion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_completedFactQuestions" ADD CONSTRAINT "_completedFactQuestions_A_fkey" FOREIGN KEY ("A") REFERENCES "FactQuestion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_completedFactQuestions" ADD CONSTRAINT "_completedFactQuestions_B_fkey" FOREIGN KEY ("B") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;
