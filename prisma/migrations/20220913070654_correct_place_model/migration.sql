/*
  Warnings:

  - You are about to drop the column `geometries` on the `Place` table. All the data in the column will be lost.
  - Added the required column `geometry` to the `Place` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Place" DROP COLUMN "geometries",
ADD COLUMN     "geometry" JSONB NOT NULL;
