import { Controller } from '@nestjs/common';
import { Param, Patch, UseGuards } from '@nestjs/common/decorators';
import { ParseUUIDPipe } from '@nestjs/common/pipes';
import { RoleGuard } from '../auth/guards/role.guard';
import { Role } from '../enums/role.enum';
import { PromoteUserService } from './promote-user.service';

@Controller('promote-user')
export class PromoteUserController {
  constructor(private readonly promoteUserService: PromoteUserService) {}

  @Patch(':userPretendedId')
  @UseGuards(RoleGuard(Role.Admin))
  async execute(
    @Param('userPretendedId', ParseUUIDPipe) userPretendedId: string,
  ) {
    return await this.promoteUserService.execute(userPretendedId);
  }
}
