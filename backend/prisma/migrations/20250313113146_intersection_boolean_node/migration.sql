-- AlterTable
ALTER TABLE "Node" ADD COLUMN     "isIntersection" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Players" ADD COLUMN     "highscore" INTEGER;
