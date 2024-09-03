/*
  Warnings:

  - The `competence` column on the `Tables` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Tables" DROP COLUMN "competence",
ADD COLUMN     "competence" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
