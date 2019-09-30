import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exception.filter';
import { ValidationPipe } from './common/pipes/validation.pipe';
import { RequestLoggerInterceptor } from './common/interceptors/request-logger.interceptor';
import { API_PORT } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.setGlobalPrefix('/api/v1');
  app.useGlobalInterceptors(new RequestLoggerInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter());

  const options = new DocumentBuilder()
    .setBasePath('/api/v1')
    .setTitle('Captify API Documentation')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api-docs', app, document);

  await app.listen(API_PORT);
}

bootstrap();
