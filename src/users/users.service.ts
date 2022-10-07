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
import { CheckExistance } from './interfaces/check-existance';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  private async checkExistance(existance: CheckExistance): Promise<void> {
    const isExistent = await this.prisma.users.findFirst({
      where: existance.where,
    });
    if (!!isExistent === existance.expect)
      throw new BadRequestException(existance.message);
  }

  async create(user: CreateUser): Promise<OutCreatedUser> {
    await this.checkExistance({
      expect: true,
      message: 'usuario já existe',
      where: { email: user.email, username: user.username },
    });
    const { password, ...userWithoutPassword } = user;
    const hasahedPassword = await bcrypt.hash(password, 12);

    const newUser = await this.prisma.users.create({
      data: {
        ...userWithoutPassword,
        password: hasahedPassword,
      },
    });

    delete newUser.password;

    return newUser;
  }

  async findOne(username: string): Promise<Users> {
    await this.checkExistance({
      expect: false,
      message: 'usuario não existe',
      where: { username },
    });
    const user = await this.prisma.users.findFirst({
      where: { username },
    });

    return user;
  }

  async findOneById(id: string): Promise<Users> {
    await this.checkExistance({
      expect: false,
      message: 'usuario não existe',
      where: { id },
    });
    const user = await this.prisma.users.findFirst({
      where: { id: id },
    });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async getRole(id: string) {
    return await this.prisma.users.findFirst({
      where: { id },
      select: { role: true },
    });
  }

  async insertRefreshTokenOnDatabase({
    newRefreshToken,
    userId,
  }: RefreshTokenInsertion): Promise<void> {
    await this.checkExistance({
      expect: false,
      message: 'usuario não existe',
      where: { id: userId },
    });
    await this.prisma.users.update({
      where: { id: userId },
      data: { refresh_token: newRefreshToken.toString() },
    });
  }

  async popRefreshToken(userId: string): Promise<void> {
    await this.checkExistance({
      expect: false,
      message: 'usuario não existe',
      where: { id: userId },
    });
    await this.prisma.users.update({
      where: { id: userId },
      data: { refresh_token: null },
    });
  }
}
