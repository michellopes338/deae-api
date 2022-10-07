import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsEmail, Length } from 'class-validator';

export class User {
  @Exclude({ toClassOnly: true })
  id: string;

  @ApiProperty()
  @Length(8, 64)
  username: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @Exclude({ toClassOnly: true })
  verified_email: boolean;

  @ApiProperty()
  @Length(8, 64)
  @Exclude({ toPlainOnly: true })
  password: string;

  @Exclude()
  role: any;

  @Exclude({ toPlainOnly: true })
  refresh_token: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
