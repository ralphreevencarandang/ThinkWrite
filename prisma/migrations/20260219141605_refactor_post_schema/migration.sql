/*
  Warnings:

  - You are about to drop the column `published` on the `post` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "post_published_publishedAt_idx";

-- AlterTable
ALTER TABLE "post" DROP COLUMN "published",
ADD COLUMN     "isPublish" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "publishedAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "category" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "post_isPublish_publishedAt_idx" ON "post"("isPublish", "publishedAt");
