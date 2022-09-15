import { Test, TestingModule } from '@nestjs/testing';
import { ValidateDeaeController } from './validate-deae.controller';
import { ValidateDeaeService } from './validate-deae.service';

describe('ValidateDeaeController', () => {
  let controller: ValidateDeaeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ValidateDeaeController],
      providers: [ValidateDeaeService],
    }).compile();

    controller = module.get<ValidateDeaeController>(ValidateDeaeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
