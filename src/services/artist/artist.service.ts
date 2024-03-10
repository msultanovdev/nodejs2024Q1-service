import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArtistDto } from '../../dto/create.artist.dto';
import { UpdateArtistDto } from '../../dto/update.artist.dto';
import { DatabaseService } from '../../database/database/database.service';
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
    const artist = this.databaseService.createArtist(dto);
    return artist;
  }

  getAll() {
    return this.databaseService.getAllArtists();
  }

  getOne(id: string) {
    const isValidId = uuidValidate(id);
    if (isValidId) {
      const artist = this.databaseService.getArtistById(id);
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
      const artist = this.databaseService.getArtistById(id);
      if (artist) {
        const dto = new UpdateArtistDto(updateArtistDto);

        const validationErrors = await validate(dto);

        if (validationErrors.length > 0) {
          throw new HttpException('Something wrong :(', HttpStatus.BAD_REQUEST);
        }
        artist.updateArtist(dto);
        return artist;
      }
      throw new HttpException(
        `Artist with ${id} was not found in database`,
        HttpStatus.NOT_FOUND,
      );
    }
    throw new HttpException('Invalid id (not uuid)', HttpStatus.BAD_REQUEST);
  }

  remove(id: string) {
    const isValidId = uuidValidate(id);
    if (isValidId) {
      const artist = this.databaseService.getArtistById(id);
      if (artist) {
        this.databaseService.deleteArtist(id);
        return;
      }
      throw new HttpException(
        `Artist with ${id} was not found in database`,
        HttpStatus.NOT_FOUND,
      );
    }
    throw new HttpException('Invalid id (not uuid)', HttpStatus.BAD_REQUEST);
  }
}
