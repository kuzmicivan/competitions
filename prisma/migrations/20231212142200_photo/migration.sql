/*
  Warnings:

  - You are about to drop the `Photo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Photo" DROP CONSTRAINT "Photo_noteId_fkey";

-- AlterTable
ALTER TABLE "Note" ADD COLUMN     "photo" BYTEA;

-- DropTable
DROP TABLE "Photo";
