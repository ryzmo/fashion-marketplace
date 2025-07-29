/*
  Warnings:

  - Added the required column `maxDiscount` to the `Coupon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Coupon" ADD COLUMN     "maxDiscount" INTEGER NOT NULL;
