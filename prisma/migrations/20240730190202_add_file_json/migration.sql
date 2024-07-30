/*
  Warnings:

  - Added the required column `fileJson` to the `Tables` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tables" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "fileUrl" TEXT NOT NULL,
    "fileJson" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Tables_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Tables" ("fileUrl", "id", "name", "userId") SELECT "fileUrl", "id", "name", "userId" FROM "Tables";
DROP TABLE "Tables";
ALTER TABLE "new_Tables" RENAME TO "Tables";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
