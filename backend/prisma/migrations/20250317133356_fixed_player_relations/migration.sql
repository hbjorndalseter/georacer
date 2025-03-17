/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `completed_question` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Player` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Player` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Game" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Player" DROP COLUMN "completed_question",
DROP COLUMN "createdAt",
DROP COLUMN "email",
DROP COLUMN "password",
DROP COLUMN "updatedAt";

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

-- CreateIndex
CREATE UNIQUE INDEX "Player_name_key" ON "Player"("name");

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
