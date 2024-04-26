-- CreateTable
CREATE TABLE "Place" (
    "id" SERIAL NOT NULL,
    "place_id" TEXT NOT NULL,
    "formatted" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "postcode" INTEGER NOT NULL,
    "street" TEXT NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lon" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Place_pkey" PRIMARY KEY ("id")
);
