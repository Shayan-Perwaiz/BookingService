-- CreateTable
CREATE TABLE `idempotencyKey` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idemKey` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `bookingId` INTEGER NULL,

    UNIQUE INDEX `idempotencyKey_idemKey_key`(`idemKey`),
    UNIQUE INDEX `idempotencyKey_bookingId_key`(`bookingId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `idempotencyKey` ADD CONSTRAINT `idempotencyKey_bookingId_fkey` FOREIGN KEY (`bookingId`) REFERENCES `booking`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
