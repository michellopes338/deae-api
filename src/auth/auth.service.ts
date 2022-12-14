import { Injectable } from '@nestjs/common';
import { OutValidUser, UserCredentials } from './dto/users.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {
  AccessToken,
  CheckRefreshToken,
  Payload,
  RefreshToken,
} from '../interfaces/jwt.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser({
    username,
    password,
  }: UserCredentials): Promise<OutValidUser | null> {
    const user = await this.userService.findOne(username);
    const isUserValid = user && (await bcrypt.compare(password, user.password));

    if (isUserValid) {
      const { password, ...response } = user;

      return response;
    }

    return null;
  }

  async generateAccessToken({
    username,
    sub,
    role,
  }: Payload): Promise<AccessToken> {
    const payload = { username, sub, role };

    return {
      access_token: this.jwtService.sign(payload, {
        expiresIn: '1m',
      }),
    };
  }

  async generateRefreshToken({
    username,
    sub,
    role,
  }: Payload): Promise<RefreshToken> {
    const payload = {
      username,
      sub,
      role,
      date_login: new Date(),
    };

    return {
      refresh_token: this.jwtService.sign(payload, {
        expiresIn: '5d',
      }),
    };
  }

  async checkRefreshToken({
    requestRefreshToken,
    userId,
  }: CheckRefreshToken): Promise<any> {
    const { refresh_token } = await this.userService.findOneById(userId);
    const isRefreshTokenValid = requestRefreshToken === refresh_token;
    return isRefreshTokenValid;
  }
}
