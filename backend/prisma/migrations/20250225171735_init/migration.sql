-- CreateTable
CREATE TABLE "CityMap" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "tileUrl" TEXT NOT NULL,
    "startNodeId" INTEGER NOT NULL,

    CONSTRAINT "CityMap_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Node" (
    "id" INTEGER NOT NULL,
    "cityMapId" INTEGER NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Node_pkey" PRIMARY KEY ("cityMapId","id")
);

-- CreateTable
CREATE TABLE "Edge" (
    "cityMapId" INTEGER NOT NULL,
    "node1Id" INTEGER NOT NULL,
    "node2Id" INTEGER NOT NULL,

    CONSTRAINT "Edge_pkey" PRIMARY KEY ("cityMapId","node1Id","node2Id")
);

-- AddForeignKey
ALTER TABLE "Node" ADD CONSTRAINT "Node_cityMapId_fkey" FOREIGN KEY ("cityMapId") REFERENCES "CityMap"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Edge" ADD CONSTRAINT "Edge_cityMapId_node1Id_fkey" FOREIGN KEY ("cityMapId", "node1Id") REFERENCES "Node"("cityMapId", "id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Edge" ADD CONSTRAINT "Edge_cityMapId_node2Id_fkey" FOREIGN KEY ("cityMapId", "node2Id") REFERENCES "Node"("cityMapId", "id") ON DELETE RESTRICT ON UPDATE CASCADE;
