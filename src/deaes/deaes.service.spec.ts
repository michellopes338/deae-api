import { Test, TestingModule } from '@nestjs/testing';
import { DeaesService } from './deaes.service';

describe('DeaesService', () => {
  let service: DeaesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeaesService],
    }).compile();

    service = module.get<DeaesService>(DeaesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
