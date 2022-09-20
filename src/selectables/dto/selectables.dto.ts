import { Exclude } from 'class-transformer';
import { IsString, Length } from 'class-validator';

export class CreateSelectables {
  @Exclude()
  id: string;

  @IsString()
  @Length(5, 64)
  label: string;

  @Exclude()
  deae: any;
}

export class UpdateSelectables extends CreateSelectables {}

export interface UpdateSelectablesParams {
  id: string;
  newSelectable: UpdateSelectables;
}
