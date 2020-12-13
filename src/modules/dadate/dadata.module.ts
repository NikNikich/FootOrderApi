import {
  DynamicModule,
  HttpModule,
  HttpModuleAsyncOptions,
  HttpModuleOptions,
  Module,
} from '@nestjs/common';
import { ConfigService } from '@modules/config/config.service';
import { DaDataService } from '@modules/dadate/dadate.service';
import { DADATA_KEY } from '@modules/dadate/dadata.const';

@Module({})
export class DaDataModule {
  static forRoot(options: HttpModuleOptions): DynamicModule {
    return {
      module: DaDataModule,
      imports: [
        HttpModule.registerAsync({
          useFactory: async (configService: ConfigService) => ({
            baseURL:
              options.baseURL || configService.config.DADATA_URL,
          }),
          inject: [ConfigService],
        }),
      ],
      providers: [
        {
          provide: DADATA_KEY,
          useClass: DaDataService,
        },
      ],
      exports: [DADATA_KEY],
    };
  }

  static forRootAsync(
    options?: HttpModuleAsyncOptions,
  ): DynamicModule {
    return {
      module: DaDataModule,
      imports: [
        HttpModule.registerAsync(
          this.createConfigAsyncProviders(options),
        ),
      ],
      providers: [
        {
          provide: DADATA_KEY,
          useClass: DaDataService,
        },
      ],
      exports: [DADATA_KEY],
    };
  }

  private static createConfigAsyncProviders(
    options: HttpModuleAsyncOptions,
  ): HttpModuleAsyncOptions {
    if (options) {
      if (options.useFactory) {
        return {
          useFactory: options.useFactory,
          inject: [ConfigService],
        };
      }
      options.inject.push(ConfigService);
      return options;
    }
    return {
      useFactory: async (configService: ConfigService) => ({
        baseURL: configService.config.DADATA_URL,
      }),
      inject: [ConfigService],
    };
  }
}
