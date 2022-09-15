import { Exclude } from 'class-transformer';
import { IsString } from 'class-validator';

export class CreateSelectables {
  @Exclude()
  id: string;

  @IsString()
  label: string;

  @Exclude()
  deae: any;
}

export class UpdateSelectables extends CreateSelectables {}

export interface UpdateSelectablesParams {
  id: string;
  newSelectable: UpdateSelectables;
}
