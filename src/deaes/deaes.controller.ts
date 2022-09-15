import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { DeaesService } from './deaes.service';
import { InsertDeae, UpdateDeae, UserFromRequest } from './dto/deae.dto';
import { Scope } from '../interfaces/query.dto';
// import { Response as ResponseExpressType } from 'express';

@Controller('deaes')
export class DeaesController {
  constructor(private readonly deaesService: DeaesService) {}

  @Post()
  async create(@Request() request: any, @Body() bodyDeae: InsertDeae) {
    const user: UserFromRequest = request.user;

    const newDeae = this.deaesService.create({
      id: user.userId,
      newDeae: bodyDeae,
    });

    return newDeae;
  }

  @Get()
  async findAll(@Query() { limit = 20, offset = 0 }: Scope) {
    const deaes = this.deaesService.findAll({ limit, offset });

    return deaes;
  }

  @Get('user')
  async findAllByUser(
    @Request() request: any,
    @Query() { limit = 20, offset = 0 }: Scope,
  ) {
    const user: UserFromRequest = request.user;

    const deaes = await this.deaesService.findAllByUser({
      userId: user.userId,
      scope: { limit, offset },
    });

    return deaes;
  }

  @Get('raw/:id')
  async findOneComplete(@Param('id', ParseUUIDPipe) id: string) {
    const deae = await this.deaesService.findOne(id);

    return deae;
  }

  @Get('relationed/:id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const deaeRelationed = await this.deaesService.findOneRelationed(id);

    return deaeRelationed;
  }

  @Patch(':deaeId')
  async updateOne(
    @Request() request: any,
    @Param('deaeId', ParseUUIDPipe) deaeId: string,
    @Body() newDeaeInfo: UpdateDeae,
  ) {
    const user: UserFromRequest = request.user;

    if (Object.keys(newDeaeInfo).length === 0) {
      throw new BadRequestException('Requisição vazia');
    }

    const userHasDeae = await this.deaesService.checkIfUserHasDeae({
      userId: user.userId,
      deaeId,
    });

    if (!userHasDeae) {
      throw new ForbiddenException('Você não pode editar o deae de outro');
    }

    return this.deaesService.updateOne({ id: deaeId, newInfos: newDeaeInfo });
  }

  @Delete(':id')
  async removeOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.deaesService.removeOne(id);
  }
}
