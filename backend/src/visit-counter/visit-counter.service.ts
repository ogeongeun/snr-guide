import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { VisitCounter } from './visit-counter.schema';
import { Model } from 'mongoose';

@Injectable()
export class VisitCounterService {
  constructor(
    @InjectModel(VisitCounter.name) private counterModel: Model<VisitCounter>,
  ) {}

  async increment(): Promise<void> {
    await this.counterModel.updateOne({}, { $inc: { count: 1 } }, { upsert: true });
  }

  async getCount(): Promise<number> {
    const counter = await this.counterModel.findOne();
    return counter?.count || 0;
  }
}
