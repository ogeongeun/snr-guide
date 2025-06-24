import { Controller, Get, Post } from '@nestjs/common';
import { VisitCounterService } from './visit-counter.service';

@Controller('visit-counter')
export class VisitCounterController {
  constructor(private readonly visitService: VisitCounterService) {}

  @Post()
  async incrementVisit(): Promise<void> {
    await this.visitService.increment();
  }

  @Get()
  async getVisitCount(): Promise<{ count: number }> {
    const count = await this.visitService.getCount();
    return { count };
  }
}
