/*
  Warnings:

  - You are about to drop the column `sessionTimeout` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `UserRole` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserRole" DROP CONSTRAINT "UserRole_roleId_fkey";

-- DropForeignKey
ALTER TABLE "UserRole" DROP CONSTRAINT "UserRole_userId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "sessionTimeout",
ADD COLUMN     "sessionTimeoutInMiliseconds" INTEGER NOT NULL DEFAULT 604800000;

-- DropTable
DROP TABLE "UserRole";
