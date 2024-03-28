import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { PrismaClientModule } from 'src/modules/prisma/prisma.module';

@Module({
  imports: [PrismaClientModule],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
