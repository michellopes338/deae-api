import { Test, TestingModule } from '@nestjs/testing';
import { ValidateDeaeService } from './validate-deae.service';

describe('ValidateDeaeService', () => {
  let service: ValidateDeaeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ValidateDeaeService],
    }).compile();

    service = module.get<ValidateDeaeService>(ValidateDeaeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
