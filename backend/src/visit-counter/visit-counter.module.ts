import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VisitCounter, VisitCounterSchema } from './visit-counter.schema';
import { VisitCounterService } from './visit-counter.service';
import { VisitCounterController } from './visit-counter.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: VisitCounter.name, schema: VisitCounterSchema }])
  ],
  controllers: [VisitCounterController],
  providers: [VisitCounterService]
})
export class VisitCounterModule {}
