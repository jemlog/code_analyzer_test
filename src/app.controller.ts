import { Controller, Get, Inject, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ClientKafka, Ctx, KafkaContext, MessagePattern, Payload } from '@nestjs/microservices';
import { TEST_TOPIC } from './constants';
@Controller()
export class AppController implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject('KAFKA_CLIENT') private readonly kafkaClient: ClientKafka,
  ) {}

  onModuleInit() {
      this.kafkaClient.subscribeToResponseOf(TEST_TOPIC);
      this.kafkaClient.connect();
  }

  onModuleDestroy() {
    this.kafkaClient.close();
  }


  @Get('/test')
  test() {
   const message = { value: 12345 };
   this.kafkaClient.emit(TEST_TOPIC, message);
  }

  @MessagePattern(TEST_TOPIC)
  readMessage(@Payload() message: any, @Ctx() context: KafkaContext) {
      console.log('message:', message);
      console.log('context:', context);
  }
}
