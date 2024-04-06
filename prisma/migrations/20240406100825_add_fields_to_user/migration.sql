/*
  Warnings:

  - Added the required column `expiryDate` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `issuingState` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `licenseNumber` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `newsletters` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pincode` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `smsNotifications` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "expiryDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "issuingState" TEXT NOT NULL,
ADD COLUMN     "licenseNumber" TEXT NOT NULL,
ADD COLUMN     "newsletters" BOOLEAN NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "pincode" TEXT NOT NULL,
ADD COLUMN     "smsNotifications" BOOLEAN NOT NULL;
