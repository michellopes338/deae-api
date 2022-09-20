import { BadRequestException } from '@nestjs/common';
import { Scope } from '../../interfaces/query.dto';
import {
  CreateSelectables,
  UpdateSelectablesParams,
} from '../dto/selectables.dto';

export abstract class SelectablesService {
  constructor(private readonly modelDelegate: any) {
    this.modelDelegate = modelDelegate;
  }

  async create(newLocal: CreateSelectables): Promise<any> {
    try {
      return await this.modelDelegate.create({ data: newLocal });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new BadRequestException('Esse selecionavel já existe');
      }
    }
  }

  async findAll({ limit, offset }: Scope): Promise<any[]> {
    const data = await this.modelDelegate.findMany();

    return data;
  }

  async update({ id, newSelectable }: UpdateSelectablesParams): Promise<any> {
    return this.modelDelegate.update({
      where: { id },
      data: { ...newSelectable },
    });
  }

  async delete(localId: string) {
    try {
      return await this.modelDelegate.delete({ where: { id: localId } });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new BadRequestException('Selecionavel não existe');
      }
    }
  }
}
