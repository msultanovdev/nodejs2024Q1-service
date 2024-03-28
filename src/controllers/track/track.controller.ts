import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  ValidationPipe,
  ParseUUIDPipe,
} from '@nestjs/common';
import { TrackService } from '../../services/track/track.service';
import { CreateTrackDto } from '../../dto/create.track.dto';
import { UpdateTrackDto } from '../../dto/update.track.dto';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @Get()
  findAll() {
    return this.trackService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trackService.getOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTrackDto: UpdateTrackDto) {
    return this.trackService.update(id, updateTrackDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trackService.remove(id);
  }
}
