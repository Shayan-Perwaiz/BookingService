/*
  Warnings:

  - Made the column `bookingId` on table `idempotencykey` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `idempotencykey` DROP FOREIGN KEY `idempotencyKey_bookingId_fkey`;

-- AlterTable
ALTER TABLE `idempotencykey` MODIFY `bookingId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `idempotencyKey` ADD CONSTRAINT `idempotencyKey_bookingId_fkey` FOREIGN KEY (`bookingId`) REFERENCES `booking`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
