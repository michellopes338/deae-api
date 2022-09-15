import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Users } from '@prisma/client';
import { Role } from '../enums/role.enum';

@Injectable()
export class DescentUserService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(
    userPretendedId: string,
  ): Promise<Omit<Users, 'password' | 'refresh_token'>> {
    return await this.prisma.users.update({
      where: { id: userPretendedId },
      data: { role: Role.User },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
      },
    });
  }
}
