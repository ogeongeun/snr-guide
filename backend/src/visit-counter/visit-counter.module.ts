import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VisitCounterService } from './visit-counter.service';
import { VisitCounterController } from './visit-counter.controller';
import { VisitCounter, VisitCounterSchema } from './visit-counter.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: VisitCounter.name, schema: VisitCounterSchema },
    ]),
  ],
  controllers: [VisitCounterController],
  providers: [VisitCounterService],
})
export class VisitCounterModule {}
