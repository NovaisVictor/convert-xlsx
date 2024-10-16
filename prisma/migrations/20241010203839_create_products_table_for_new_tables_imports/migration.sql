/*
  Warnings:

  - You are about to drop the `Tables` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Tables" DROP CONSTRAINT "Tables_companyId_fkey";

-- DropForeignKey
ALTER TABLE "Tables" DROP CONSTRAINT "Tables_ownerId_fkey";

-- DropTable
DROP TABLE "Tables";

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "cnpj" TEXT NOT NULL,
    "emission" TIMESTAMP(3) NOT NULL,
    "productCode" TEXT NOT NULL,
    "productDecription" TEXT NOT NULL,
    "nmcCode" TEXT NOT NULL,
    "cfop" TEXT NOT NULL,
    "icmsBase" TEXT NOT NULL,
    "pisCofinsBase" TEXT NOT NULL,
    "competence" TIMESTAMP(3) NOT NULL,
    "companyId" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Product_companyId_competence_idx" ON "Product"("companyId", "competence");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
