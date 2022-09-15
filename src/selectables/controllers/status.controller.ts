import { Controller } from '@nestjs/common';
import { StatusService } from '../services/status.service';
import { SelectablesController } from './selectables.controller';

@Controller('selectables/status')
export class StatusController extends SelectablesController {
  constructor(private readonly statusSerive: StatusService) {
    super(statusSerive);
  }
}
