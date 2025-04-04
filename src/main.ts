import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { KAFKA_OPTION } from './constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>(KAFKA_OPTION);
  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
