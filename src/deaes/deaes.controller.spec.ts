import { Test, TestingModule } from '@nestjs/testing';
import { DeaesController } from './deaes.controller';
import { DeaesService } from './deaes.service';

describe('DeaesController', () => {
  let controller: DeaesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeaesController],
      providers: [DeaesService],
    }).compile();

    controller = module.get<DeaesController>(DeaesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
