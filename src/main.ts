import { NestFactory } from '@nestjs/core';
import { ValidationPipe, ValidationPipeOptions } from '@nestjs/common';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/interceptors/index';
import { AnyExceptionFilter } from 'common/filters/index';
import { ErrorHandler, Logger } from './common/services/index';
import { config } from '../config/index';


const errorHandler = new ErrorHandler(new Logger());

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ skipMissingProperties: true }));
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new AnyExceptionFilter(errorHandler));
  app.setGlobalPrefix(config.apiPath);

  await app.listen(3000);
}
bootstrap();
