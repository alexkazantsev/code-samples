import { Module, NestModule, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { LoggerMiddleware } from './middlewares';
import { ORM_COFIG } from './config';

@Module({
  imports: [
    TypeOrmModule.forRoot(ORM_COFIG),
    UserModule,
  ],
  controllers: [AppController],
  components: [],
})
export class ApplicationModule implements NestModule {
  configure(consumer: MiddlewaresConsumer) {
    consumer.apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
