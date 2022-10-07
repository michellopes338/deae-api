import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class PromoteUserService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(userPretendedId: string): Promise<User> {
    const user = await this.prisma.users.update({
      where: { id: userPretendedId },
      data: { role: Role.ADMIN },
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
