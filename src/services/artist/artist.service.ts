import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArtistDto } from '../../dto/create.artist.dto';
import { UpdateArtistDto } from '../../dto/update.artist.dto';
import { DatabaseService } from '../../database/database.service';
import { validate as uuidValidate } from 'uuid';
import { validate } from 'class-validator';

@Injectable()
export class ArtistService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createArtistDto: CreateArtistDto) {
    const dto = new CreateArtistDto(createArtistDto);

    const validationErrors = await validate(dto);

    if (validationErrors.length > 0) {
      throw new HttpException('Something wrong :(', HttpStatus.BAD_REQUEST);
    }
    const artist = await this.databaseService.createArtist(dto);
    return artist;
  }

  async getAll() {
    return await this.databaseService.getAllArtists();
  }

  async getOne(id: string) {
    const isValidId = uuidValidate(id);
    if (isValidId) {
      const artist = await this.databaseService.getArtistById(id);
      if (artist) return artist;
      throw new HttpException(
        `Artist with ${id} was not found in database`,
        HttpStatus.NOT_FOUND,
      );
    }
    throw new HttpException('Invalid id (not uuid)', HttpStatus.BAD_REQUEST);
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const isValidId = uuidValidate(id);
    if (isValidId) {
      const artist = await this.databaseService.getArtistById(id);
      if (artist) {
        const dto = new UpdateArtistDto(updateArtistDto);

        const validationErrors = await validate(dto);

        if (validationErrors.length > 0) {
          throw new HttpException('Something wrong :(', HttpStatus.BAD_REQUEST);
        }

        return await this.databaseService.updateArtist(artist.id, dto);
      }
      throw new HttpException(
        `Artist with ${id} was not found in database`,
        HttpStatus.NOT_FOUND,
      );
    }
    throw new HttpException('Invalid id (not uuid)', HttpStatus.BAD_REQUEST);
  }

  async remove(id: string) {
    const isValidId = uuidValidate(id);
    if (isValidId) {
      const artist = await this.databaseService.getArtistById(id);
      if (artist) {
        return await this.databaseService.deleteArtist(id);
      }
      throw new HttpException(
        `Artist with ${id} was not found in database`,
        HttpStatus.NOT_FOUND,
      );
    }
    throw new HttpException('Invalid id (not uuid)', HttpStatus.BAD_REQUEST);
  }
}
