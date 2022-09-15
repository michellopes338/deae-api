import { Test, TestingModule } from '@nestjs/testing';
import { DescentUserService } from './descent-user.service';

describe('DescentUserService', () => {
  let service: DescentUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DescentUserService],
    }).compile();

    service = module.get<DescentUserService>(DescentUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
