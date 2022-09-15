import { Test, TestingModule } from '@nestjs/testing';
import { DescentUserController } from './descent-user.controller';
import { DescentUserService } from './descent-user.service';

describe('DescentUserController', () => {
  let controller: DescentUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DescentUserController],
      providers: [DescentUserService],
    }).compile();

    controller = module.get<DescentUserController>(DescentUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
