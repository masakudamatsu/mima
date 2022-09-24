-- CreateTable
CREATE TABLE "Place" (
    "id" SERIAL NOT NULL,
    "geometries" JSONB NOT NULL,
    "properties" JSONB NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "Place_pkey" PRIMARY KEY ("id")
);
