import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import { ReqeustLoggerInterceptor } from './interceptors';

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  app.useGlobalInterceptors(new ReqeustLoggerInterceptor());
  await app.listen(3000);
}
bootstrap();
