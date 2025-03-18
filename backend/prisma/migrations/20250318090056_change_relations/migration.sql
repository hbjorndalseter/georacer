/*
  Warnings:

  - You are about to drop the `Coordinate` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[id]` on the table `Node` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `citymapId` to the `FactQuestion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hint` to the `FactQuestion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `citymapId` to the `RiddleQuestion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hint` to the `RiddleQuestion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `citymapId` to the `SpacialQuestion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hint` to the `SpacialQuestion` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "FactQuestion" DROP CONSTRAINT "FactQuestion_locationId_fkey";

-- DropForeignKey
ALTER TABLE "RiddleQuestion" DROP CONSTRAINT "RiddleQuestion_locationId_fkey";

-- DropForeignKey
ALTER TABLE "SpacialQuestion" DROP CONSTRAINT "SpacialQuestion_locationId_fkey";

-- AlterTable
ALTER TABLE "FactQuestion" ADD COLUMN     "citymapId" INTEGER NOT NULL,
ADD COLUMN     "hint" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "RiddleQuestion" ADD COLUMN     "citymapId" INTEGER NOT NULL,
ADD COLUMN     "hint" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SpacialQuestion" ADD COLUMN     "citymapId" INTEGER NOT NULL,
ADD COLUMN     "hint" TEXT NOT NULL;

-- DropTable
DROP TABLE "Coordinate";

-- CreateIndex
CREATE UNIQUE INDEX "Node_id_key" ON "Node"("id");

-- AddForeignKey
ALTER TABLE "SpacialQuestion" ADD CONSTRAINT "SpacialQuestion_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Node"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpacialQuestion" ADD CONSTRAINT "SpacialQuestion_citymapId_fkey" FOREIGN KEY ("citymapId") REFERENCES "CityMap"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FactQuestion" ADD CONSTRAINT "FactQuestion_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Node"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FactQuestion" ADD CONSTRAINT "FactQuestion_citymapId_fkey" FOREIGN KEY ("citymapId") REFERENCES "CityMap"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RiddleQuestion" ADD CONSTRAINT "RiddleQuestion_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Node"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RiddleQuestion" ADD CONSTRAINT "RiddleQuestion_citymapId_fkey" FOREIGN KEY ("citymapId") REFERENCES "CityMap"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
