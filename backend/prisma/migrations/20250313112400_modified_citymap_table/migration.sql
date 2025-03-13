/*
  Warnings:

  - You are about to drop the column `startNodeId` on the `CityMap` table. All the data in the column will be lost.
  - You are about to drop the column `tileUrl` on the `CityMap` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CityMap" DROP COLUMN "startNodeId",
DROP COLUMN "tileUrl";
