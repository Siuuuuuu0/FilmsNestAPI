/*
  Warnings:

  - You are about to drop the `_ActorToMovie` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ActorToMovie" DROP CONSTRAINT "_ActorToMovie_A_fkey";

-- DropForeignKey
ALTER TABLE "_ActorToMovie" DROP CONSTRAINT "_ActorToMovie_B_fkey";

-- DropTable
DROP TABLE "_ActorToMovie";

-- CreateTable
CREATE TABLE "MovieActor" (
    "movieId" INTEGER NOT NULL,
    "actorId" INTEGER NOT NULL,

    CONSTRAINT "MovieActor_pkey" PRIMARY KEY ("movieId","actorId")
);

-- AddForeignKey
ALTER TABLE "MovieActor" ADD CONSTRAINT "MovieActor_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieActor" ADD CONSTRAINT "MovieActor_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "Actor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
