/*
  Warnings:

  - The primary key for the `Product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `cnpj` on the `Product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[companyId,productCode,competence]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Product" DROP CONSTRAINT "Product_pkey",
DROP COLUMN "cnpj",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Product_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Product_id_seq";

-- CreateTable
CREATE TABLE "ImportedTable" (
    "id" TEXT NOT NULL,
    "nameFile" TEXT NOT NULL,
    "fileHash" TEXT NOT NULL,
    "importDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ImportedTable_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ImportedTable_fileHash_key" ON "ImportedTable"("fileHash");

-- CreateIndex
CREATE UNIQUE INDEX "Product_companyId_productCode_competence_key" ON "Product"("companyId", "productCode", "competence");
