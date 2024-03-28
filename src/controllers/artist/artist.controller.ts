import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ValidationPipe,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ArtistService } from '../../services/artist/artist.service';
import { CreateArtistDto } from '../../dto/create.artist.dto';
import { UpdateArtistDto } from '../../dto/update.artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(
    @Body(new ValidationPipe({ whitelist: true }))
    createArtirstDto: CreateArtistDto,
  ) {
    return this.artistService.create(createArtirstDto);
  }

  @Get()
  findAll() {
    return this.artistService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.artistService.getOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id,
    @Body(new ValidationPipe({ whitelist: true }))
    updateArtistDto: UpdateArtistDto,
  ) {
    return this.artistService.update(id, updateArtistDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.artistService.remove(id);
  }
}
