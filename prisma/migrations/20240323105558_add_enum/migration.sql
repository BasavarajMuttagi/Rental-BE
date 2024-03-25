/*
  Warnings:

  - The `carType` column on the `Car` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to alter the column `description` on the `Car` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "Car" DROP COLUMN "carType",
ADD COLUMN     "carType" "CarType" NOT NULL DEFAULT 'SPORT',
ALTER COLUMN "description" SET DATA TYPE VARCHAR(255);
