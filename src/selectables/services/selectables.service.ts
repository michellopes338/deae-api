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
    return this.modelDelegate.create({ data: newLocal });
  }

  async findAll({ limit, offset }: Scope): Promise<any[]> {
    const data = await this.modelDelegate.findMany({
      take: limit,
      skip: offset,
    });

    return data;
  }

  async update({ id, newSelectable }: UpdateSelectablesParams): Promise<any> {
    console.log(newSelectable, id);
    return this.modelDelegate.update({
      where: { id },
      data: { ...newSelectable },
    });
  }

  async delete(localId: string) {
    return this.modelDelegate.delete({ where: { id: localId } });
  }
}
