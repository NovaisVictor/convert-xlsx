-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'MEMBER');

-- AlterTable
ALTER TABLE "member" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'MEMBER';
