/*
  Warnings:

  - You are about to drop the column `bookingAmout` on the `booking` table. All the data in the column will be lost.
  - Added the required column `bookingAmount` to the `booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `booking` DROP COLUMN `bookingAmout`,
    ADD COLUMN `bookingAmount` INTEGER NOT NULL;
