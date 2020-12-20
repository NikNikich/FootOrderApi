import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { getBooleanValue } from '@shared/functions/get-boolean-value.shared';

export class ConfigDto {
  /**
   * name environment install
   */
  @IsOptional()
  @IsString()
  NODE_ENV = 'development';

  /**
   * server port
   */
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  BACKEND_PORT = 3000;

  /**
   * global controller prefix
   */
  @IsOptional()
  @IsString()
  GLOBAL_CONTROLLER_PREFIX = 'v1';

  /**
   * Swagger host
   */
  @IsOptional()
  @IsString()
  SWAGGER_HOST = `http://localhost:${this.BACKEND_PORT}`;

  /**
   * interface DB
   */
  @IsNotEmpty()
  @IsString()
  TYPEORM_CONNECTION: 'postgres';

  /**
   * host database
   */
  @IsNotEmpty()
  @IsString()
  TYPEORM_HOST: string;

  /**
   * username from base
   */
  @IsNotEmpty()
  @IsString()
  TYPEORM_USERNAME: string;

  /**
   * password base
   */
  @IsNotEmpty()
  @IsString()
  TYPEORM_PASSWORD: string;

  /**
   * name base
   */
  @IsNotEmpty()
  @IsString()
  TYPEORM_DATABASE: string;

  /**
   *  port base
   */
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  TYPEORM_PORT: number;

  /**
   * base is synchronize
   * @default false
   */
  @IsOptional()
  @IsBoolean()
  @Transform((value) => getBooleanValue(value))
  TYPEORM_SYNCHRONIZE = false;

  /**
   * migrations is run
   * @default false
   */
  @IsOptional()
  @IsBoolean()
  @Transform((value) => getBooleanValue(value))
  TYPEORM_MIGRATIONS_RUN = false;

  /**
   * typeOrm is logging
   * @default false
   */
  @IsOptional()
  @IsBoolean()
  @Transform((value) => getBooleanValue(value))
  TYPEORM_LOGGING = false;

  /**
   * secret JWT key
   */
  @IsNotEmpty()
  @IsString()
  JWT_SECRET: string;

  /**
   * life time refresh tokens
   */
  @IsNotEmpty()
  @IsString()
  REFRESH_TOKEN_LIFE_TIME: string;

  /**
   * life time tokens
   */
  @IsNotEmpty()
  @IsString()
  TOKEN_TIME: string;

  /**
   * secret key from restore JWT
   */
  @IsNotEmpty()
  @IsString()
  JWT_RESTORE_SECRET: string;

  /**
   * upload files path
   */
  @IsOptional()
  @IsString()
  UPLOAD_PATH = './upload/file';

  /**
   * dadata api key
   */
  @IsNotEmpty()
  @IsString()
  DADATA_API_KEY: string;

  /**
   * dadata secret key
   */
  @IsNotEmpty()
  @IsString()
  DADATA_SECRET_KEY: string;

  /**
   *  dadata service url
   */
  @IsNotEmpty()
  @IsString()
  DADATA_URL: string;
}
