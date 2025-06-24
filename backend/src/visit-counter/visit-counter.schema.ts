import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class VisitCounter extends Document {
  @Prop({ required: true })
  date: string; // 예: '2025-06-25'

  @Prop({ default: 1 })
  count: number;

  @Prop({ default: Date.now, expires: 172800 }) // TTL: 2일 후 자동 삭제
  createdAt: Date;
}

export const VisitCounterSchema = SchemaFactory.createForClass(VisitCounter);
