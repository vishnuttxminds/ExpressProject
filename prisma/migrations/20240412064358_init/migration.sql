-- CreateTable
CREATE TABLE `MMPost` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MMCategory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MMCategoriesOnPosts` (
    `postId` INTEGER NOT NULL,
    `categoryId` INTEGER NOT NULL,
    `assignedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `assignedBy` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`postId`, `categoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MMCategoriesOnPosts` ADD CONSTRAINT `MMCategoriesOnPosts_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `MMPost`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MMCategoriesOnPosts` ADD CONSTRAINT `MMCategoriesOnPosts_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `MMCategory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
