/*
  Warnings:

  - A unique constraint covering the columns `[courseIdentifier]` on the table `Course` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `courseIdentifier` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "courseIdentifier" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Course_courseIdentifier_key" ON "Course"("courseIdentifier");
