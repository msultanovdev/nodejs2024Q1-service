import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { UserController } from './controllers/user/user.controller';
import { DatabaseModule } from './database/database.module';
import { UserService } from './services/user/user.service';
import { DatabaseService } from './database/database.service';
import { TrackModule } from './modules/track/track.module';
import { TrackController } from './controllers/track/track.controller';
import { TrackService } from './services/track/track.service';
import { ArtistModule } from './modules/artist/artist.module';
import { ArtistController } from './controllers/artist/artist.controller';
import { ArtistService } from './services/artist/artist.service';
import { AlbumModule } from './modules/album/album.module';
import { AlbumService } from './services/album/album.service';
import { AlbumController } from './controllers/album/album.controller';
import { FavsModule } from './modules/favs/favs.module';
import { FavsService } from './services/favs/favs.service';
import { FavsController } from './controllers/favs/favs.controller';

@Module({
  imports: [
    UserModule,
    DatabaseModule,
    TrackModule,
    ArtistModule,
    AlbumModule,
    FavsModule,
  ],
  controllers: [
    AppController,
    UserController,
    TrackController,
    ArtistController,
    AlbumController,
    FavsController,
  ],
  providers: [
    AppService,
    UserService,
    DatabaseService,
    TrackService,
    ArtistService,
    AlbumService,
    FavsService,
  ],
})
export class AppModule {}
