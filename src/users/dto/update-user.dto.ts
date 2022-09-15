import { PartialType } from '@nestjs/swagger';
import { CreateUser } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUser) {}
