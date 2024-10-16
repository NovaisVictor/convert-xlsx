-- DropForeignKey
ALTER TABLE "ImportedTable" DROP CONSTRAINT "ImportedTable_companyId_fkey";

-- DropForeignKey
ALTER TABLE "ImportedTable" DROP CONSTRAINT "ImportedTable_ownerId_fkey";

-- AddForeignKey
ALTER TABLE "ImportedTable" ADD CONSTRAINT "ImportedTable_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImportedTable" ADD CONSTRAINT "ImportedTable_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
