import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../enums/role.enum';
import { Exclude } from 'class-transformer';
import { IsEmail, Length } from 'class-validator';

export class CreateUser {
  @Exclude()
  id: string;

  @ApiProperty()
  @Length(8, 64)
  username: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @Length(8, 64)
  password: string;

  @Exclude()
  role: any;

  @Exclude()
  refresh_token: string;
}

export class OutCreatedUser {
  @Exclude()
  id: string;

  @ApiProperty()
  @Length(8, 64)
  username: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @Exclude()
  role: any;

  @Exclude()
  password: string;

  @Exclude()
  refresh_token: string;
}
