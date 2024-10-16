/*
  Warnings:

  - Added the required column `competence` to the `ImportedTable` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerId` to the `ImportedTable` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ImportedTable" ADD COLUMN     "companyId" TEXT,
ADD COLUMN     "competence" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "ownerId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ImportedTable" ADD CONSTRAINT "ImportedTable_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImportedTable" ADD CONSTRAINT "ImportedTable_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
