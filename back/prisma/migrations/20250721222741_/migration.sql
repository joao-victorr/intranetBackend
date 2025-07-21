/*
  Warnings:

  - Made the column `sessionTimeout` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "sessionTimeout" SET NOT NULL,
ALTER COLUMN "sessionTimeout" DROP DEFAULT;
