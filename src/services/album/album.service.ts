import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { CreateAlbumDto } from '../../dto/create.album.dto';
import { UpdateAlbumDto } from '../../dto/update.album.dto';
import { DatabaseService } from '../../database/database.service';
import { validate as uuidValidate } from 'uuid';
import { validate } from 'class-validator';

@Injectable()
export class AlbumService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createAlbumDto: CreateAlbumDto) {
    const dto = new CreateAlbumDto(createAlbumDto);

    const validationErrors = await validate(dto);

    if (validationErrors.length > 0) {
      throw new HttpException('Something wrong :(', HttpStatus.BAD_REQUEST);
    }

    const { artistId } = dto;
    if (artistId) {
      const artist = this.databaseService.getArtistById(artistId);
      if (!artist) {
        throw new HttpException(
          'Artist is not existing in db',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    return await this.databaseService.createAlbum(dto);
  }

  async getAll() {
    return await this.databaseService.getAllAlbums();
  }

  async getOne(id: string) {
    const isValidId = uuidValidate(id);
    if (isValidId) {
      const album = await this.databaseService.getAlbumById(id);
      if (album) return album;
      throw new HttpException(
        `Artist with ${id} was not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    throw new HttpException('Invalid id (not uuid)', HttpStatus.BAD_REQUEST);
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const isValidId = uuidValidate(id);
    if (isValidId) {
      const album = await this.databaseService.getAlbumById(id);
      if (album) {
        const dto = new UpdateAlbumDto(updateAlbumDto);

        const validationErrors = await validate(dto);

        if (validationErrors.length > 0) {
          throw new HttpException('Bad Req', HttpStatus.BAD_REQUEST);
        }

        const { artistId } = dto;
        if (artistId) {
          const artist = await this.databaseService.getArtistById(artistId);
          if (!artist) {
            throw new HttpException('Artist rejected', HttpStatus.BAD_REQUEST);
          }
        }

        return this.databaseService.updateAlbum(album.id, dto);
      }
      throw new HttpException('Album was not found', HttpStatus.NOT_FOUND);
    }
    throw new HttpException('Invalid ID', HttpStatus.BAD_REQUEST);
  }

  async remove(id: string) {
    const isValidId = uuidValidate(id);
    if (isValidId) {
      const album = await this.databaseService.getAlbumById(id);
      if (album) {
        return await this.databaseService.deleteAlbum(id);
      }
      throw new HttpException(
        `Artist with ${id} was not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    throw new HttpException('Invalid id (not uuid)', HttpStatus.BAD_REQUEST);
  }
}
