import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*', // 또는 'http://localhost:3000'
  });

  await app.listen(process.env.PORT || 3000);
}

bootstrap(); // 이 줄은 함수 밖에 있어야 함
