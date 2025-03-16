/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Coordinate` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Coordinate` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `fact_question` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `fact_question` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `riddle_question` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `riddle_question` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `spacial_question` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `spacial_question` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Coordinate" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "fact_question" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "riddle_question" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "spacial_question" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";
