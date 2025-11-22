/*
  Warnings:

  - You are about to drop the column `type` on the `Activity` table. All the data in the column will be lost.
  - Added the required column `destinationId` to the `Activity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tripId` to the `destination` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `trip` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "type",
ADD COLUMN     "destinationId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "destination" ADD COLUMN     "tripId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "trip" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "trip" ADD CONSTRAINT "trip_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "destination" ADD CONSTRAINT "destination_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "trip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "destination"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Accommodation" ADD CONSTRAINT "Accommodation_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "destination"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
