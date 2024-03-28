import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Fav } from 'src/modules/favs/fav.model';
import { validate as uuidValidate } from 'uuid';

@Injectable()
export class FavsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAll() {
    return await this.databaseService.getAllFavouritesFormatted();
  }

  async addArtist(id: string) {
    if (uuidValidate(id)) {
      const artistDoesExist = await this.databaseService.getArtistById(id);
      if (artistDoesExist) {
        const favs: Fav = await this.databaseService.getAllFavourites();
        const artistAlreadyInFavs = favs.artists.find(
          (artistId) => artistId === id,
        );

        if (artistAlreadyInFavs) {
          throw new HttpException('Artist is in favs', HttpStatus.CONFLICT);
        } else {
          await this.databaseService.addArtistToFavs(id);
          return `${id} artist is added to favourites`;
        }
      } else {
        throw new HttpException('No artist', HttpStatus.UNPROCESSABLE_ENTITY);
      }
    } else {
      throw new HttpException('Invalid id (not uuid)', HttpStatus.BAD_REQUEST);
    }
  }
  async removeArtist(id: string) {
    if (uuidValidate(id)) {
      const favs: Fav = await this.databaseService.getAllFavourites();
      const artistIsInFavs = favs.artists.find((artistId) => artistId === id);
      if (artistIsInFavs) {
        await this.databaseService.removeArtistFromFavs(id);
        return `Artist with ID: ${id} is removed from favourites`;
      } else {
        throw new HttpException(
          `Not found artist in favs`,
          HttpStatus.NOT_FOUND,
        );
      }
    } else {
      throw new HttpException('Invalid id (not uuid)', HttpStatus.BAD_REQUEST);
    }
  }

  async addAlbum(id: string) {
    if (uuidValidate(id)) {
      const albumDoesExist = await this.databaseService.getAlbumById(id);
      if (albumDoesExist) {
        const favs: Fav = await this.databaseService.getAllFavourites();
        const albumAlreadyInFavs = favs.albums.find(
          (albumId) => albumId === id,
        );
        if (albumAlreadyInFavs) {
          throw new HttpException('Album is in favs', HttpStatus.CONFLICT);
        } else {
          await this.databaseService.addAlbumToFavs(id);
          return `Album with ID: ${id} is added to favourites`;
        }
      } else {
        throw new HttpException('No album', HttpStatus.UNPROCESSABLE_ENTITY);
      }
    } else {
      throw new HttpException('Invalid id (not uuid)', HttpStatus.BAD_REQUEST);
    }
  }
  async removeAlbum(id: string) {
    if (uuidValidate(id)) {
      const favs: Fav = await this.databaseService.getAllFavourites();
      const albumIsInFavs = favs.albums.find((albumId) => albumId === id);
      if (albumIsInFavs) {
        await this.databaseService.removeAlbumFromFavs(id);
        return `Album with ID: ${id} is removed from favourites`;
      } else {
        throw new HttpException(`Album is not found`, HttpStatus.NOT_FOUND);
      }
    } else {
      throw new HttpException('Invalid id (not uuid)', HttpStatus.BAD_REQUEST);
    }
  }

  async addTrack(id: string) {
    if (uuidValidate(id)) {
      const isTrackInFav = await this.databaseService.getTrackById(id);
      if (isTrackInFav) {
        const favs: Fav = await this.databaseService.getAllFavourites();
        const trackAlreadyInFavs = favs.tracks.find(
          (trackId) => trackId === id,
        );
        if (trackAlreadyInFavs) {
          throw new HttpException(
            'Track is existing in favs',
            HttpStatus.CONFLICT,
          );
        } else {
          await this.databaseService.addTrackToFavs(id);
          return `Track with ID: ${id} is added to favourites`;
        }
      } else {
        throw new HttpException('No track', HttpStatus.UNPROCESSABLE_ENTITY);
      }
    } else {
      throw new HttpException('Invalid id (not uuid)', HttpStatus.BAD_REQUEST);
    }
  }
  async removeTrack(id: string) {
    if (uuidValidate(id)) {
      const favs: Fav = await this.databaseService.getAllFavourites();
      const trackIsInFavs = favs.tracks.find((trackId) => trackId === id);
      if (trackIsInFavs) {
        await this.databaseService.removeTrackFromFavs(id);
        return `Track with ID: ${id} is removed from favourites`;
      } else {
        throw new HttpException(
          `Track was not found in favs`,
          HttpStatus.NOT_FOUND,
        );
      }
    } else {
      throw new HttpException('Invalid id (not uuid)', HttpStatus.BAD_REQUEST);
    }
  }
}
