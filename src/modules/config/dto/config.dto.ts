import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { Transform, Type } from 'class-transformer'
import { getBooleanValue } from '@shared/function.shared'

export class ConfigDto {
  /**
   * name environment install
   */
  @IsOptional()
  @IsString()
  NODE_ENV = 'development'

  /**
   * type DB
   */
  @IsNotEmpty()
  @IsString()
  TYPEORM_CONNECTION: 'postgres'

  /**
   * host database
   */
  @IsNotEmpty()
  @IsString()
  TYPEORM_HOST: string

  /**
   * username from base
   */
  @IsNotEmpty()
  @IsString()
  TYPEORM_USERNAME: string

  /**
   * password base
   */
  @IsNotEmpty()
  @IsString()
  TYPEORM_PASSWORD: string

  /**
   * name base
   */
  @IsNotEmpty()
  @IsString()
  TYPEORM_DATABASE: string

  /**
   *  port base
   */
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  TYPEORM_PORT: number

  /**
   * base is synchronize
   * @default false
   */
  @IsOptional()
  @IsBoolean()
  @Transform((value) => getBooleanValue(value))
  TYPEORM_SYNCHRONIZE = false

  /**
   * typeOrm is logging
   * @default false
   */
  @IsOptional()
  @IsBoolean()
  @Transform((value) => getBooleanValue(value))
  TYPEORM_LOGGING = false
}
