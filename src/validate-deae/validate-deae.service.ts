import { Injectable } from '@nestjs/common';
import { Deae } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ValidateDeaeService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(deaeId: string): Promise<Deae> {
    return this.prisma.deae.update({
      where: { id: deaeId },
      data: { is_valid: true, updated_at: new Date() },
    });
  }
}
