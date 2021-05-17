/*
  Warnings:

  - You are about to drop the column `email` on the `users` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "users.email_unique";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "email";
