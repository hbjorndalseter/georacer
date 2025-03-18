/*
  Warnings:

  - You are about to drop the column `citymapId` on the `FactQuestion` table. All the data in the column will be lost.
  - You are about to drop the column `locationId` on the `FactQuestion` table. All the data in the column will be lost.
  - You are about to drop the column `citymapId` on the `RiddleQuestion` table. All the data in the column will be lost.
  - You are about to drop the column `locationId` on the `RiddleQuestion` table. All the data in the column will be lost.
  - You are about to drop the column `citymapId` on the `SpacialQuestion` table. All the data in the column will be lost.
  - You are about to drop the column `locationId` on the `SpacialQuestion` table. All the data in the column will be lost.
  - Added the required column `cityMapId` to the `FactQuestion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationNodeId` to the `FactQuestion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cityMapId` to the `RiddleQuestion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationNodeId` to the `RiddleQuestion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cityMapId` to the `SpacialQuestion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationNodeId` to the `SpacialQuestion` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "FactQuestion" DROP CONSTRAINT "FactQuestion_citymapId_fkey";

-- DropForeignKey
ALTER TABLE "FactQuestion" DROP CONSTRAINT "FactQuestion_locationId_fkey";

-- DropForeignKey
ALTER TABLE "RiddleQuestion" DROP CONSTRAINT "RiddleQuestion_citymapId_fkey";

-- DropForeignKey
ALTER TABLE "RiddleQuestion" DROP CONSTRAINT "RiddleQuestion_locationId_fkey";

-- DropForeignKey
ALTER TABLE "SpacialQuestion" DROP CONSTRAINT "SpacialQuestion_citymapId_fkey";

-- DropForeignKey
ALTER TABLE "SpacialQuestion" DROP CONSTRAINT "SpacialQuestion_locationId_fkey";

-- DropIndex
DROP INDEX "Node_id_key";

-- AlterTable
ALTER TABLE "FactQuestion" DROP COLUMN "citymapId",
DROP COLUMN "locationId",
ADD COLUMN     "cityMapId" INTEGER NOT NULL,
ADD COLUMN     "locationNodeId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "RiddleQuestion" DROP COLUMN "citymapId",
DROP COLUMN "locationId",
ADD COLUMN     "cityMapId" INTEGER NOT NULL,
ADD COLUMN     "locationNodeId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "SpacialQuestion" DROP COLUMN "citymapId",
DROP COLUMN "locationId",
ADD COLUMN     "cityMapId" INTEGER NOT NULL,
ADD COLUMN     "locationNodeId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "SpacialQuestion" ADD CONSTRAINT "SpacialQuestion_cityMapId_locationNodeId_fkey" FOREIGN KEY ("cityMapId", "locationNodeId") REFERENCES "Node"("cityMapId", "id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FactQuestion" ADD CONSTRAINT "FactQuestion_cityMapId_locationNodeId_fkey" FOREIGN KEY ("cityMapId", "locationNodeId") REFERENCES "Node"("cityMapId", "id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RiddleQuestion" ADD CONSTRAINT "RiddleQuestion_cityMapId_locationNodeId_fkey" FOREIGN KEY ("cityMapId", "locationNodeId") REFERENCES "Node"("cityMapId", "id") ON DELETE RESTRICT ON UPDATE CASCADE;
