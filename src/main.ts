import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Logger as LoggerPino, LoggerErrorInterceptor } from 'nestjs-pino';
import { AppModule } from './app.module';
const logger = new Logger('Bootstrap');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(LoggerPino));
  app.useGlobalInterceptors(new LoggerErrorInterceptor());

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(process.env.PORT);
}
bootstrap()
  .finally(() => logger.log(`api-todo is up and running: ${process.env.PORT}`))
  .catch();
