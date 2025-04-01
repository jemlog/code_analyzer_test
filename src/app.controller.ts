import { Controller, Get, Inject, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ClientKafka, Ctx, KafkaContext, MessagePattern, Payload } from '@nestjs/microservices';
import { TEST_TOPIC } from './constants';
import { AvatarCreatedEvent } from './producer.req.dto';
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

  @Get('/avatar')
  test() {
   const message = { value : { avatarId: 'sdf33-322f43-124gjt-qkdd3r', userId: 'hrdwvs-32ha43-1hhgjt-hrs22' } }
   this.kafkaClient.emit(TEST_TOPIC, message);
  }

  @MessagePattern(TEST_TOPIC)
  readMessage(@Payload() message: AvatarCreatedEvent) {
      console.log('avatarId:', message.avatarId);
      console.log('userId:', message.userId);
  }
}
