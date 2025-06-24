import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class VisitCounter extends Document {
  @Prop({ default: 0 })
  count: number;
}

export const VisitCounterSchema = SchemaFactory.createForClass(VisitCounter);
