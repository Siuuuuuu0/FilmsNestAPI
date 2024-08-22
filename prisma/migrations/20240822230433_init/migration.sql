-- AlterTable
ALTER TABLE "Movie" ADD COLUMN     "description" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "genres" TEXT[] DEFAULT ARRAY[]::TEXT[];
