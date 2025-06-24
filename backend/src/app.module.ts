import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VisitCounterModule } from './visit-counter/visit-counter.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot(), // .env 로딩 활성화
   MongooseModule.forRoot(process.env.MONGODB_URI!),
    VisitCounterModule,
  ],
})
export class AppModule {}
