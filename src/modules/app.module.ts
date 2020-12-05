import { Module } from '@nestjs/common'
import { DatabaseModule } from './database/database.module'
import { ConfigModule } from './config/config.module'

const envName = process.env.NODE_ENV ? `/.env.${process.env.NODE_ENV}` : '/.env'

@Module({
  imports: [ConfigModule.register(process.cwd() + envName), DatabaseModule],
  exports: [ConfigModule],
  providers: [ConfigModule],
})
export class AppModule {}
