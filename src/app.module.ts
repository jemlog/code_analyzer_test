import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CatModule } from './cats/cat.module';
import { ClientsModule } from '@nestjs/microservices';
import { KAFKA_OPTION } from './constants';

@Module({
  imports: [
    CatModule,
    ClientsModule.register([
      {
        name: 'KAFKA_CLIENT',
        ...KAFKA_OPTION
      },
    ]),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
