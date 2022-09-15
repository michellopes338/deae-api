import { Module } from '@nestjs/common';
import { LocalService } from './services/local.service';
import { LocalController } from './controllers/local.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { StatusController } from './controllers/status.controller';
import { StatusService } from './services/status.service';
import { ClassificationController } from './controllers/classification.controller';
import { ClassificationService } from './services/classification.service';

@Module({
  imports: [PrismaModule],
  controllers: [LocalController, StatusController, ClassificationController],
  providers: [LocalService, StatusService, ClassificationService],
})
export class SelectablesModule {}
