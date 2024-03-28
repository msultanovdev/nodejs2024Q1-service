/*
  Warnings:

  - You are about to drop the `_AlbumToFavorites` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ArtistToFavorites` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_FavoritesToTrack` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_AlbumToFavorites" DROP CONSTRAINT "_AlbumToFavorites_A_fkey";

-- DropForeignKey
ALTER TABLE "_AlbumToFavorites" DROP CONSTRAINT "_AlbumToFavorites_B_fkey";

-- DropForeignKey
ALTER TABLE "_ArtistToFavorites" DROP CONSTRAINT "_ArtistToFavorites_A_fkey";

-- DropForeignKey
ALTER TABLE "_ArtistToFavorites" DROP CONSTRAINT "_ArtistToFavorites_B_fkey";

-- DropForeignKey
ALTER TABLE "_FavoritesToTrack" DROP CONSTRAINT "_FavoritesToTrack_A_fkey";

-- DropForeignKey
ALTER TABLE "_FavoritesToTrack" DROP CONSTRAINT "_FavoritesToTrack_B_fkey";

-- AlterTable
ALTER TABLE "Favorites" ADD COLUMN     "albums" TEXT[],
ADD COLUMN     "artists" TEXT[],
ADD COLUMN     "tracks" TEXT[],
ALTER COLUMN "id" SET DEFAULT 'favs';

-- DropTable
DROP TABLE "_AlbumToFavorites";

-- DropTable
DROP TABLE "_ArtistToFavorites";

-- DropTable
DROP TABLE "_FavoritesToTrack";
