import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { UserController } from './controllers/user/user.controller';
import { DatabaseModule } from './database/database/database.module';
import { UserService } from './services/user/user.service';
import { DatabaseService } from './database/database/database.service';

@Module({
  imports: [UserModule, DatabaseModule],
  controllers: [AppController, UserController],
  providers: [AppService, UserService, DatabaseService],
})
export class AppModule {}
