import { Module } from '@nestjs/common';
import { ValidateDeaeService } from './validate-deae.service';
import { ValidateDeaeController } from './validate-deae.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { DeaesModule } from 'src/deaes/deaes.module';

@Module({
  imports: [PrismaModule, DeaesModule],
  controllers: [ValidateDeaeController],
  providers: [ValidateDeaeService],
})
export class ValidateDeaeModule {}
