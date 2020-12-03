import { NestFactory } from '@nestjs/core'
import { Logger } from '@nestjs/common'
import {
  initializeTransactionalContext,
  patchTypeORMRepositoryWithBaseRepository,
} from 'typeorm-transactional-cls-hooked'
import { AppModule } from './modules/app.module'

async function bootstrap() {
  await NestFactory.createApplicationContext(AppModule)
  const logger = new Logger(bootstrap.name)
  logger.log('Server was started')
  initializeTransactionalContext()
  patchTypeORMRepositoryWithBaseRepository()
}

bootstrap()
