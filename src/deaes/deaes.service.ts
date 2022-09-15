import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CheckIfUserHasDeaeParam,
  CreateDeaeParams,
  FindAllByUserParams,
  UpdateDeaeParams,
} from './dto/deae.dto';
import { Scope } from '../interfaces/query.dto';
import { Deae } from '@prisma/client';

@Injectable()
export class DeaesService {
  constructor(private prisma: PrismaService) {}

  async create({ id, newDeae }: CreateDeaeParams): Promise<Deae> {
    const insertedDeae = await this.prisma.deae.create({
      data: { userId: id, ...newDeae },
    });

    return insertedDeae;
  }

  async findAll({ limit, offset }: Scope): Promise<Deae[]> {
    const deaes = await this.prisma.deae.findMany({
      take: limit,
      skip: offset,
    });

    return deaes;
  }

  async checkIfUserHasDeae({
    userId,
    deaeId,
  }: CheckIfUserHasDeaeParam): Promise<boolean> {
    const deae = await this.prisma.deae.findFirst({
      where: {
        id: deaeId,
        userId,
      },
    });

    if (!deae) {
      return false;
    }

    return true;
  }

  async findOneRelationed(id: string): Promise<any> {
    const deae = await this.prisma.deae.findUnique({
      where: { id },
      select: {
        id: true,
        adjustment: true,
        classification: true,
        deviation: true,
        local: true,
        status: true,
        user: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
    });

    return deae;
  }

  async findOne(id: string): Promise<Deae> {
    const deae = await this.prisma.deae.findUnique({
      where: { id },
    });

    return deae;
  }

  async findAllByUser({ userId, scope }: FindAllByUserParams): Promise<Deae[]> {
    return this.prisma.deae.findMany({
      where: { userId: userId },
      take: scope.limit,
      skip: scope.offset,
    });
  }

  async updateOne({ id, newInfos }: UpdateDeaeParams): Promise<Deae> {
    return this.prisma.deae.update({
      where: { id },
      data: { ...newInfos, updated_at: new Date() },
    });
  }

  async removeOne(id: string): Promise<Deae> {
    return this.prisma.deae.delete({ where: { id } });
  }
}
