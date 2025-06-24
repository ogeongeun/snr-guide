import { Test, TestingModule } from '@nestjs/testing';
import { VisitCounterController } from './visit-counter.controller';

describe('VisitCounterController', () => {
  let controller: VisitCounterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VisitCounterController],
    }).compile();

    controller = module.get<VisitCounterController>(VisitCounterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
