import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { UserController } from './controllers/user/user.controller';
import { DatabaseModule } from './database/database/database.module';
import { UserService } from './services/user/user.service';
import { DatabaseService } from './database/database/database.service';
import { TrackModule } from './modules/track/track.module';
import { TrackController } from './controllers/track/track.controller';
import { TrackService } from './services/track/track.service';

@Module({
  imports: [UserModule, DatabaseModule, TrackModule],
  controllers: [AppController, UserController, TrackController],
  providers: [AppService, UserService, DatabaseService, TrackService],
})
export class AppModule {}
