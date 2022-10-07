import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Role } from '../enums/role.enum';
import { User } from '../users/entities/user.entity';

@Injectable()
export class DescentUserService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(userPretendedId: string): Promise<User> {
    const user = await this.prisma.users.update({
      where: { id: userPretendedId },
      data: { role: Role.User },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
      },
    });

    return new User(user);
  }
}
