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
  async login(
    @Request() request: any,
    @Response() response: ResponseExpressType,
  ) {
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

    response.header('Authorization', access_token);
    response.status(200).send({ refresh_token });
  }

  @Public()
  @HttpCode(200)
  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  async updateToken(@Request() request: any) {
    const { isRefreshTokenValid, user }: RefreshTokenWithPayload = request.user;
    if (!isRefreshTokenValid) {
      await this.usersService.popRefreshToken(user.sub);
      throw new ForbiddenException();
    }

    const { access_token } = await this.authService.generateAccessToken({
      ...user,
    });

    const { refresh_token } = await this.authService.generateRefreshToken({
      ...user,
    });

    await this.usersService.insertRefreshTokenOnDatabase({
      newRefreshToken: refresh_token,
      userId: user.sub,
    });

    return { access_token, refresh_token };
  }
}
