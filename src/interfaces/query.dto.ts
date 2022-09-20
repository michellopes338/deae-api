import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class Scope {
  @ApiProperty()
  @IsOptional()
  limit: number;

  @ApiProperty()
  @IsOptional()
  offset: number;
}

export class QuerySearch extends Scope {
  @ApiProperty()
  @IsOptional()
  fields: string;

  @ApiProperty()
  @IsOptional()
  search: string | boolean;

  @ApiProperty()
  @IsOptional()
  order: 'asc' | 'desc';
}
