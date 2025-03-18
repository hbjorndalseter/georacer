/*
  Warnings:

  - You are about to drop the column `locationNodeId` on the `FactQuestion` table. All the data in the column will be lost.
  - You are about to drop the column `locationNodeId` on the `RiddleQuestion` table. All the data in the column will be lost.
  - You are about to drop the column `locationNodeId` on the `SpacialQuestion` table. All the data in the column will be lost.
  - Added the required column `nodeId` to the `FactQuestion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nodeId` to the `RiddleQuestion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nodeId` to the `SpacialQuestion` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "FactQuestion" DROP CONSTRAINT "FactQuestion_cityMapId_locationNodeId_fkey";

-- DropForeignKey
ALTER TABLE "RiddleQuestion" DROP CONSTRAINT "RiddleQuestion_cityMapId_locationNodeId_fkey";

-- DropForeignKey
ALTER TABLE "SpacialQuestion" DROP CONSTRAINT "SpacialQuestion_cityMapId_locationNodeId_fkey";

-- AlterTable
ALTER TABLE "FactQuestion" DROP COLUMN "locationNodeId",
ADD COLUMN     "nodeId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "RiddleQuestion" DROP COLUMN "locationNodeId",
ADD COLUMN     "nodeId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "SpacialQuestion" DROP COLUMN "locationNodeId",
ADD COLUMN     "nodeId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "SpacialQuestion" ADD CONSTRAINT "SpacialQuestion_cityMapId_nodeId_fkey" FOREIGN KEY ("cityMapId", "nodeId") REFERENCES "Node"("cityMapId", "id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FactQuestion" ADD CONSTRAINT "FactQuestion_cityMapId_nodeId_fkey" FOREIGN KEY ("cityMapId", "nodeId") REFERENCES "Node"("cityMapId", "id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RiddleQuestion" ADD CONSTRAINT "RiddleQuestion_cityMapId_nodeId_fkey" FOREIGN KEY ("cityMapId", "nodeId") REFERENCES "Node"("cityMapId", "id") ON DELETE RESTRICT ON UPDATE CASCADE;
