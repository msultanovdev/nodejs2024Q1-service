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
import { AlbumService } from '../../services/album/album.service';
import { CreateAlbumDto } from '../../dto/create.album.dto';
import { UpdateAlbumDto } from '../../dto/update.album.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(
    @Body(new ValidationPipe({ whitelist: true }))
    createAlbumDto: CreateAlbumDto,
  ) {
    return this.albumService.create(createAlbumDto);
  }

  @Get()
  findAll() {
    return this.albumService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.albumService.getOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id,
    @Body(new ValidationPipe({ whitelist: true }))
    updateAlbumDto: UpdateAlbumDto,
  ) {
    return this.albumService.update(id, updateAlbumDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.albumService.remove(id);
  }
}
