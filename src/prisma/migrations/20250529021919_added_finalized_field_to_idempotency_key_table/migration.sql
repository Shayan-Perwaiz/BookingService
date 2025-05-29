/*
  Warnings:

  - Added the required column `finalized` to the `idempotencyKey` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `idempotencykey` ADD COLUMN `finalized` BOOLEAN NOT NULL;
