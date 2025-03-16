/*
  Warnings:

  - Added the required column `score` to the `player` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "player" ADD COLUMN     "completed_question" INTEGER[],
ADD COLUMN     "score" INTEGER NOT NULL;
