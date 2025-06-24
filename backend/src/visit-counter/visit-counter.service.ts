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
    const today = new Date().toISOString().slice(0, 10); // '2025-06-25'

    await this.counterModel.updateOne(
      { date: today },
      {
        $inc: { count: 1 },
        $setOnInsert: { createdAt: new Date() },
      },
      { upsert: true }
    );
  }

  async getCount(): Promise<number> {
    const today = new Date().toISOString().slice(0, 10);
    const counter = await this.counterModel.findOne({ date: today });
    return counter?.count || 0;
  }
}
