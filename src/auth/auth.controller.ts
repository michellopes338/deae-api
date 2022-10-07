import {
  Controller,
  UseGuards,
  Post,
  Request,
  Response,
  ForbiddenException,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import {
  Request as RequestExpressType,
  Response as ResponseExpressType,
} from 'express';
import { UsersService } from '../users/users.service';
import { Public } from '../decorators/public.decorator';
import {
  Payload,
  RefreshToken,
  RefreshTokenWithPayload,
} from '../interfaces/jwt.interface';
import { JwtRefreshGuard } from './guards/refresh-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() request: any) {
    const { username, id: sub, role } = request.user;
    const { access_token } = await this.authService.generateAccessToken({
      username,
      sub,
      role,
    });
    const { refresh_token } = await this.authService.generateRefreshToken({
      username,
      sub,
      role,
    });

    await this.usersService.insertRefreshTokenOnDatabase({
      newRefreshToken: refresh_token,
      userId: sub,
    });

    return { access_token, refresh_token };
  }

  @Public()
  @HttpCode(200)
  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  async updateToken(@Request() request: any) {
    const { isRefreshTokenValid, ...restRequest }: RefreshTokenWithPayload =
      request.user;

    if (!isRefreshTokenValid) {
      await this.usersService.popRefreshToken(request.user.user.id);
      throw new ForbiddenException();
    }

    return this.login(restRequest);
  }
}
