import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Request } from 'express';
import { Payload } from '../../interfaces/jwt.interface';
import { AuthService } from '../auth.service';

ConfigModule.forRoot();

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt_refresh_token',
) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const refresh_token = request.headers.refresh;
          if (!refresh_token) {
            throw new BadRequestException(
              'não foi encontrado o cabeçalho refresh',
            );
          }
          return refresh_token.toString();
        },
      ]),
      secretOrKey: process.env.SECRET,
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: Payload) {
    const refreshToken: string = request.headers.refresh.toString();
    return this.authService.checkRefreshToken({
      requestRefreshToken: refreshToken,
      userId: payload.sub,
    });
  }
}
