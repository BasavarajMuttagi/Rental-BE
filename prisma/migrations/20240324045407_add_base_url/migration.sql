/*
  Warnings:

  - Added the required column `baseUrl` to the `Car` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Car" ADD COLUMN     "baseUrl" TEXT NOT NULL;
