/*
  Warnings:

  - Added the required column `cityMapId` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "cityMapId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_cityMapId_fkey" FOREIGN KEY ("cityMapId") REFERENCES "CityMap"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
