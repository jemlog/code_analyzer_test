import { KafkaOptions, Transport } from "@nestjs/microservices";

export const KAFKA_OPTION: KafkaOptions = {
  transport: Transport.KAFKA,
  options: {
    client: {
      brokers: ['localhost:9092'],
    },
    consumer: {
      groupId: 'test-consumer',
    }
  }
}

export const TEST_TOPIC = 'test-topic';
