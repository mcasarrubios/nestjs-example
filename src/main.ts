import { NestFactory } from '@nestjs/core';
import { ValidationPipe, ValidationPipeOptions } from '@nestjs/common';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/interceptors/index';
import { AnyExceptionFilter } from 'common/filters/index';
import { ErrorHandler, Logger } from './common/services/index';

const errorHandler = new ErrorHandler(new Logger());

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ skipMissingProperties: true }));
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new AnyExceptionFilter(errorHandler));
  app.setGlobalPrefix('v1');

  await app.listen(3000);
}
bootstrap();
