/*
  Warnings:

  - You are about to drop the column `blogId` on the `Comment` table. All the data in the column will be lost.
  - Added the required column `postId` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_blogId_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "blogId",
ADD COLUMN     "postId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
