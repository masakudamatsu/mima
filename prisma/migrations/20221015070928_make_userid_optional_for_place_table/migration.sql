-- DropForeignKey
ALTER TABLE "Place" DROP CONSTRAINT "Place_userId_fkey";

-- AlterTable
ALTER TABLE "Place" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Place" ADD CONSTRAINT "Place_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;
