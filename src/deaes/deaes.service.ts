import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CheckIfUserHasDeaeParam,
  CreateDeaeParams,
  FindAllByUserParams,
  UpdateDeaeParams,
} from './dto/deae.dto';
import { QuerySearch, Scope } from '../interfaces/query.dto';
import { Deae } from '@prisma/client';

const select = {
  id: true,
  adjustment: true,
  classification: true,
  deviation: true,
  local: true,
  status: true,
  created_at: true,
  is_valid: true,
  user: {
    select: {
      id: true,
      username: true,
      email: true,
    },
  },
};

@Injectable()
export class DeaesService {
  constructor(private prisma: PrismaService) {}

  async create({ id, newDeae }: CreateDeaeParams): Promise<Deae> {
    const insertedDeae = await this.prisma.deae.create({
      data: { userId: id, ...newDeae },
    });

    return insertedDeae;
  }

  async findAll({
    limit = 20,
    offset = 0,
    fields,
    search,
    order,
  }: QuerySearch): Promise<any> {
    if (!fields) {
      console.log('deaes');
      const deaes = await this.prisma.deae.findMany({
        select,
        take: Number(limit),
        skip: Number(offset),
        orderBy: { created_at: order },
      });

      return deaes;
    }

    const searchObject =
      search === 'true' || search === 'false'
        ? { equals: search === 'true' }
        : { contains: search };

    const arrayFields = fields.split('.');
    const objectSearch = arrayFields.reduceRight(
      (object, next, index) =>
        index + 1 !== arrayFields.length
          ? { [next]: object }
          : { [next]: searchObject },
      {},
    );
    const deaes = await this.prisma.deae.findMany({
      select,
      where: objectSearch,
      take: Number(limit),
      skip: Number(offset),
      orderBy: { created_at: order },
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
      select,
    });

    return deae;
  }

  async findOne(id: string): Promise<Deae> {
    const deae = await this.prisma.deae.findUnique({
      where: { id },
    });

    return deae;
  }

  async findAllByUser({ userId, scope }: FindAllByUserParams): Promise<any> {
    return this.prisma.deae.findMany({
      where: { userId: userId },
      take: scope.limit,
      skip: scope.offset,
      select,
      orderBy: { created_at: 'desc' },
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
