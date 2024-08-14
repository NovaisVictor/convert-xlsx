/*
  Warnings:

  - You are about to drop the column `userId` on the `Tables` table. All the data in the column will be lost.
  - Added the required column `companyId` to the `Tables` table without a default value. This is not possible if the table is not empty.
  - Added the required column `competence` to the `Tables` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerId` to the `Tables` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Tables` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `Tables` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tables" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "competence" TEXT NOT NULL,
    "fileJson" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "companyId" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    CONSTRAINT "Tables_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Tables_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Tables" ("fileJson", "id", "name") SELECT "fileJson", "id", "name" FROM "Tables";
DROP TABLE "Tables";
ALTER TABLE "new_Tables" RENAME TO "Tables";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
