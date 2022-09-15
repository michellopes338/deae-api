import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsUUID, MaxLength } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Scope } from '../../interfaces/query.dto';

export class InsertDeae {
  @Exclude()
  id: string;

  @Exclude()
  userId: string;

  @Exclude()
  is_valid: boolean;

  @ApiProperty()
  @IsUUID()
  classificationId: string;

  @ApiProperty()
  @IsUUID()
  localId: string;

  @ApiProperty()
  @IsUUID()
  statusId: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(255)
  deviation: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(255)
  adjustment: string;
}

export class UpdateDeae extends PartialType(InsertDeae) {}

export interface CreateDeaeParams {
  id: string;
  newDeae: InsertDeae;
}

export interface UpdateDeaeParams {
  id: string;
  newInfos: UpdateDeae;
}

export interface UserFromRequest {
  userId: string;
  username: string;
  role: string;
}

export interface FindAllByUserParams {
  userId: string;
  scope: Scope;
}

export interface CheckIfUserHasDeaeParam {
  userId: string;
  deaeId: string;
}
