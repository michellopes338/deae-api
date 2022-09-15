import { Test, TestingModule } from '@nestjs/testing';
import { PromoteUserController } from './promote-user.controller';
import { PromoteUserService } from './promote-user.service';

describe('PromoteUserController', () => {
  let controller: PromoteUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PromoteUserController],
      providers: [PromoteUserService],
    }).compile();

    controller = module.get<PromoteUserController>(PromoteUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
