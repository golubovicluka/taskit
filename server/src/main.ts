import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as config from 'config'

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);
  // NODE_ENV - sluzi da prepozna environment u kom se koristi - default je undefined
  // CONFIG - sluzi da prepozna koji environment se koristi - default je development
  const serverConfig = config.get('server')

  if (process.env.NODE_ENV === 'development') {
    app.enableCors();
  }

  const port = process.env.PORT || serverConfig.port; // ako nema porta, postavi na 3000
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}

bootstrap();