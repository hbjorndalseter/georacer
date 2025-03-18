-- CreateTable
CREATE TABLE "Player" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "score" INTEGER NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpacialQuestion" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "locationId" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,

    CONSTRAINT "SpacialQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FactQuestion" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "locationId" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,

    CONSTRAINT "FactQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RiddleQuestion" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "locationId" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,

    CONSTRAINT "RiddleQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Coordinate" (
    "id" SERIAL NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Coordinate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Node" (
    "id" INTEGER NOT NULL,
    "cityMapId" INTEGER NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,
    "isIntersection" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Node_pkey" PRIMARY KEY ("cityMapId","id")
);

-- CreateTable
CREATE TABLE "Edge" (
    "cityMapId" INTEGER NOT NULL,
    "node1Id" INTEGER NOT NULL,
    "node2Id" INTEGER NOT NULL,

    CONSTRAINT "Edge_pkey" PRIMARY KEY ("cityMapId","node1Id","node2Id")
);

-- CreateTable
CREATE TABLE "CityMap" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "CityMap_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Player_name_key" ON "Player"("name");

-- AddForeignKey
ALTER TABLE "SpacialQuestion" ADD CONSTRAINT "SpacialQuestion_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Coordinate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FactQuestion" ADD CONSTRAINT "FactQuestion_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Coordinate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RiddleQuestion" ADD CONSTRAINT "RiddleQuestion_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Coordinate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Node" ADD CONSTRAINT "Node_cityMapId_fkey" FOREIGN KEY ("cityMapId") REFERENCES "CityMap"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Edge" ADD CONSTRAINT "Edge_cityMapId_node1Id_fkey" FOREIGN KEY ("cityMapId", "node1Id") REFERENCES "Node"("cityMapId", "id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Edge" ADD CONSTRAINT "Edge_cityMapId_node2Id_fkey" FOREIGN KEY ("cityMapId", "node2Id") REFERENCES "Node"("cityMapId", "id") ON DELETE RESTRICT ON UPDATE CASCADE;
