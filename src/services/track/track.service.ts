import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrackDto } from '../../dto/create.track.dto';
import { UpdateTrackDto } from '../../dto/update.track.dto';
import { DatabaseService } from '../../database/database.service';
import { validate as uuidValidate } from 'uuid';
import { validate } from 'class-validator';

@Injectable()
export class TrackService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createTrackDto: CreateTrackDto) {
    const dto = new CreateTrackDto(createTrackDto);

    const validationErrors = await validate(dto);

    if (validationErrors.length > 0) {
      throw new HttpException('Something wrong :(', HttpStatus.BAD_REQUEST);
    }
    const track = this.databaseService.createTrack(dto);
    return track;
  }

  getAll() {
    return this.databaseService.getAllTracks();
  }

  getOne(id: string) {
    const isValidId = uuidValidate(id);
    if (isValidId) {
      const track = this.databaseService.getTrackById(id);
      if (track) return track;
      throw new HttpException(
        `Track with ${id} was not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    throw new HttpException('Invalid id (not uuid)', HttpStatus.BAD_REQUEST);
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const isValidId = uuidValidate(id);
    if (isValidId) {
      const track = await this.databaseService.getTrackById(id);
      if (track) {
        const dto = new UpdateTrackDto(updateTrackDto);

        const validationErrors = await validate(dto);

        if (validationErrors.length > 0) {
          throw new HttpException('Something wrong :(', HttpStatus.BAD_REQUEST);
        }
        return await this.databaseService.updateTrack(track.id, dto);
      }
      throw new HttpException(
        `Track with ${id} was not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    throw new HttpException('Invalid id (not uuid)', HttpStatus.BAD_REQUEST);
  }

  remove(id: string) {
    const isValidId = uuidValidate(id);
    if (isValidId) {
      const track = this.databaseService.getTrackById(id);
      if (track) {
        this.databaseService.deleteTrack(id);
        return;
      }
      throw new HttpException(
        `Track with ${id} was not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    throw new HttpException('Invalid id (not uuid)', HttpStatus.BAD_REQUEST);
  }
}
