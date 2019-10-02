import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RequestLoggerInterceptor } from './common/interceptors/request-logger.interceptor';
import { AllExceptionsFilter } from './common/filters/all-exception.filter';
import { ValidationPipe } from './common/pipes/validation.pipe';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { API_PORT } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.setGlobalPrefix('/api/v1');
  app.useGlobalInterceptors(new RequestLoggerInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter());

  const options = new DocumentBuilder()
    .setBasePath('/api/v1')
    .setTitle('Tron REST API Documentation')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api-docs', app, document);

  await app.listen(parseInt(API_PORT, 10));
}

bootstrap();
