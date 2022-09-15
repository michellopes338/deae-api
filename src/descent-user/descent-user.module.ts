import { Module } from '@nestjs/common';
import { DescentUserService } from './descent-user.service';
import { DescentUserController } from './descent-user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [PrismaModule, UsersModule],
  controllers: [DescentUserController],
  providers: [DescentUserService],
})
export class DescentUserModule {}
