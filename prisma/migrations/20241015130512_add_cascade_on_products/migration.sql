-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_importedTableId_fkey";

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_importedTableId_fkey" FOREIGN KEY ("importedTableId") REFERENCES "ImportedTable"("id") ON DELETE CASCADE ON UPDATE CASCADE;
