/*
  Warnings:

  - You are about to drop the column `nameFile` on the `ImportedTable` table. All the data in the column will be lost.
  - Added the required column `fileName` to the `ImportedTable` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ImportedTable" DROP COLUMN "nameFile",
ADD COLUMN     "fileName" TEXT NOT NULL;
