/*
  Warnings:

  - Made the column `companyId` on table `ImportedTable` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "ImportedTable" DROP CONSTRAINT "ImportedTable_companyId_fkey";

-- AlterTable
ALTER TABLE "ImportedTable" ALTER COLUMN "companyId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "ImportedTable" ADD CONSTRAINT "ImportedTable_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
