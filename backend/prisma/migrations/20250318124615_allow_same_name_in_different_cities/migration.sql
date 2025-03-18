/*
  Warnings:

  - A unique constraint covering the columns `[name,cityMapId]` on the table `Player` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Player_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "Player_name_cityMapId_key" ON "Player"("name", "cityMapId");
