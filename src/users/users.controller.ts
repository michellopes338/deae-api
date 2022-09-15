import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUser, OutCreatedUser } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from '@prisma/client';
import { Public } from '../decorators/public.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  async create(@Body() bodyUser: CreateUser): Promise<OutCreatedUser> {
    return await this.usersService.create(bodyUser);
  }

  @Get()
  async findOne(@Body() username: string): Promise<Users> {
    return this.usersService.findOne(username);
  }
}
