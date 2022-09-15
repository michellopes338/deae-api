import { Module } from '@nestjs/common';
import { DeaesService } from './deaes.service';
import { DeaesController } from './deaes.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [DeaesController],
  providers: [DeaesService],
  exports: [DeaesService],
})
export class DeaesModule {}
