import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DeaesModule } from './deaes/deaes.module';
import { SelectablesModule } from './selectables/selectables.module';
import { PrismaModule } from './prisma/prisma.module';
import { ValidateDeaeModule } from './validate-deae/validate-deae.module';
import { PromoteUserModule } from './promote-user/promote-user.module';
import { DescentUserModule } from './descent-user/descent-user.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    DeaesModule,
    SelectablesModule,
    PrismaModule,
    ValidateDeaeModule,
    PromoteUserModule,
    DescentUserModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
