/*
  Warnings:

  - You are about to drop the column `importDate` on the `ImportedTable` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ImportedTable" DROP COLUMN "importDate",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
