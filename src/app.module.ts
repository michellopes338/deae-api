import {
  ClassSerializerInterceptor,
  Module,
  CacheModule,
} from '@nestjs/common';
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
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtAuthUserGuard } from './auth/guards/jwt-auth.guard';

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
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    CacheModule.register(),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthUserGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
