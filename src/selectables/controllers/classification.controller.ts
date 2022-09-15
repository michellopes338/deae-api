import { Controller } from '@nestjs/common';
import { ClassificationService } from '../services/classification.service';
import { SelectablesController } from './selectables.controller';

@Controller('selectables/classification')
export class ClassificationController extends SelectablesController {
  constructor(private readonly classificationSerive: ClassificationService) {
    super(classificationSerive);
  }
}
