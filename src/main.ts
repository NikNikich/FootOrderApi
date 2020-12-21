import { AppModule } from '@modules/app.module';
import {
  INestApplication,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import {
  initializeTransactionalContext,
  patchTypeORMRepositoryWithBaseRepository,
} from 'typeorm-transactional-cls-hooked';
import { ConfigService } from '@modules/config/config.service';

const initDocumentation = (
  app: INestApplication,
  appHost: string,
): void => {
  const docOptions = new DocumentBuilder()
    .setTitle('API документация')
    .setVersion('1.0')
    .addServer(appHost)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, docOptions);
  SwaggerModule.setup('api', app, document);
};

async function bootstrap(): Promise<void> {
  const logger = new Logger(bootstrap.name);
  dotenv.config({ path: process.env.CONFIG_NAME || '.env' });
  const app = await NestFactory.create(AppModule, {
    logger: new Logger(),
  });
  const {
    BACKEND_PORT,
    GLOBAL_CONTROLLER_PREFIX,
    SWAGGER_HOST,
  } = app.get<ConfigService>('ConfigService').config;
  const appPort = BACKEND_PORT;
  const appPrefix = GLOBAL_CONTROLLER_PREFIX;
  const appHost = SWAGGER_HOST + BACKEND_PORT;
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.setGlobalPrefix(appPrefix);
  initDocumentation(app, appHost);
  initializeTransactionalContext();
  patchTypeORMRepositoryWithBaseRepository();
  await app.listen(appPort);
  logger.log(`Server was started at ${appHost}/${appPrefix}`);
}

bootstrap();
