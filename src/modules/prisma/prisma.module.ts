import { Module } from '@nestjs/common';
import { PrismaClientService } from '../../services/prisma/prisma.service';

@Module({
  providers: [PrismaClientService],
  exports: [PrismaClientService],
})
export class PrismaClientModule {}
