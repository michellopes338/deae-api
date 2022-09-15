import { Controller } from '@nestjs/common';
import { LocalService } from '../services/local.service';
import { SelectablesController } from './selectables.controller';

@Controller('selectables/local')
export class LocalController extends SelectablesController {
  constructor(private readonly localSerive: LocalService) {
    super(localSerive);
  }
}
