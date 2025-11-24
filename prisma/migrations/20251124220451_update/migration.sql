/*
  Warnings:

  - Added the required column `name` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "trip" DROP CONSTRAINT "trip_userId_fkey";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "name" TEXT DEFAULT '' NOT NULL;

-- AddForeignKey
ALTER TABLE "trip" ADD CONSTRAINT "trip_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
