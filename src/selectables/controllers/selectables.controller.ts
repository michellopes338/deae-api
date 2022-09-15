import {
  Body,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { Scope } from '../../interfaces/query.dto';
import { Role } from '../../enums/role.enum';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { ParseUUIDPipe } from '@nestjs/common/pipes/parse-uuid.pipe';
import { CreateSelectables, UpdateSelectables } from '../dto/selectables.dto';

export abstract class SelectablesController {
  constructor(private readonly service: any) {}

  @Get()
  async findAll(@Query() { limit = 20, offset = 0 }: Scope) {
    return this.service.findAll({ limit, offset });
  }

  @Post()
  @UseGuards(RoleGuard(Role.Admin))
  async create(@Body() newLocal: CreateSelectables) {
    return await this.service.create(newLocal);
  }

  @Patch(':id')
  @UseGuards(RoleGuard(Role.Admin))
  async update(
    @Body() newSelectable: UpdateSelectables,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    console.log(newSelectable);
    return await this.service.update({ newSelectable, id });
  }

  @Delete(':id')
  @UseGuards(RoleGuard(Role.Admin))
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.delete(id);
  }
}
