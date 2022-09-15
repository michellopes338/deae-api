import { Module } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UsersController } from './users.controller';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthUserGuard } from '../auth/guards/jwt-auth.guard';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthUserGuard,
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
