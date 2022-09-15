import { Controller, Param, ParseUUIDPipe, Patch } from '@nestjs/common';
import { DescentUserService } from './descent-user.service';

@Controller('descent-user')
export class DescentUserController {
  constructor(private readonly descentUserService: DescentUserService) {}

  @Patch(':userPretendedId')
  async execute(
    @Param('userPretendedId', ParseUUIDPipe) userPretendedId: string,
  ) {
    return await this.descentUserService.execute(userPretendedId);
  }
}
