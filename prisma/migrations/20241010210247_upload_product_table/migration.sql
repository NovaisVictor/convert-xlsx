/*
  Warnings:

  - Added the required column `importedTableId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Product_companyId_competence_idx";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "importedTableId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Product_companyId_importedTableId_competence_idx" ON "Product"("companyId", "importedTableId", "competence");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_importedTableId_fkey" FOREIGN KEY ("importedTableId") REFERENCES "ImportedTable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
