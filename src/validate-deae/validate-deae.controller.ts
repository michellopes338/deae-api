import {
  Controller,
  Param,
  ParseUUIDPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { RoleGuard } from '../auth/guards/role.guard';
import { Role } from '../enums/role.enum';
import { ValidateDeaeService } from './validate-deae.service';

@Controller('validate-deae')
export class ValidateDeaeController {
  constructor(private readonly validateDeaeService: ValidateDeaeService) {}

  @Patch(':deaeId')
  @UseGuards(RoleGuard(Role.Admin))
  async execute(@Param('deaeId', ParseUUIDPipe) deaeId: string) {
    return this.validateDeaeService.execute(deaeId);
  }
}
