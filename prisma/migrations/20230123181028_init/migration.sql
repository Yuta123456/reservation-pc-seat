/*
  Warnings:

  - Added the required column `studentLedget` to the `StudentLedger` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StudentLedger" ADD COLUMN     "studentLedget" INTEGER NOT NULL;
