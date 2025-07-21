/*
  Warnings:

  - You are about to drop the column `ipAddress` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `userAgent` on the `Session` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Session" DROP COLUMN "ipAddress",
DROP COLUMN "userAgent";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "sessionTimeout" SET DEFAULT 604800;
