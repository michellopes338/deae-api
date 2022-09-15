import { Test, TestingModule } from '@nestjs/testing';
import { PromoteUserService } from './promote-user.service';

describe('PromoteUserService', () => {
  let service: PromoteUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PromoteUserService],
    }).compile();

    service = module.get<PromoteUserService>(PromoteUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
