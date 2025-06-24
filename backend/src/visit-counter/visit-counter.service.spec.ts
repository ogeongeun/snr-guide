import { Test, TestingModule } from '@nestjs/testing';
import { VisitCounterService } from './visit-counter.service';

describe('VisitCounterService', () => {
  let service: VisitCounterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VisitCounterService],
    }).compile();

    service = module.get<VisitCounterService>(VisitCounterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
