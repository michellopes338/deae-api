import { Module } from '@nestjs/common';
import { PromoteUserService } from './promote-user.service';
import { PromoteUserController } from './promote-user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [PrismaModule, UsersModule],
  controllers: [PromoteUserController],
  providers: [PromoteUserService],
})
export class PromoteUserModule {}
