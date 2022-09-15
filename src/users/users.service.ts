import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Users } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { RefreshTokenInsertion } from '../interfaces/jwt.interface';
import * as bcrypt from 'bcrypt';
import { CreateUser, OutCreatedUser } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: CreateUser): Promise<OutCreatedUser> {
    const { password, ...userWithoutPassword } = user;
    const hasahedPassword = await bcrypt.hash(password, 12);

    try {
      const newUser = await this.prisma.users.create({
        data: {
          ...userWithoutPassword,
          password: hasahedPassword,
        },
      });

      delete newUser.password;

      return newUser;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new BadRequestException('Esse usuário ja existe');
      }
    }
  }

  async findOne(username: string): Promise<Users> {
    const user = await this.prisma.users.findFirst({
      where: { username },
    });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async findOneById(id: string): Promise<Users> {
    const user = await this.prisma.users.findFirst({
      where: { id: id },
    });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async insertRefreshTokenOnDatabase({
    newRefreshToken,
    userId,
  }: RefreshTokenInsertion): Promise<void> {
    const hashedRefreshToken = await bcrypt.hash(newRefreshToken, 13);

    await this.prisma.users.update({
      where: { id: userId },
      data: { refresh_token: hashedRefreshToken },
    });
  }

  async popRefreshToken(userId: string): Promise<void> {
    await this.prisma.users.update({
      where: { id: userId },
      data: { refresh_token: null },
    });
  }
}
