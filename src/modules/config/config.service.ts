import { Inject, Injectable } from '@nestjs/common'
import { DotenvParseOutput, parse } from 'dotenv'
import * as fs from 'fs'
import { Validator } from 'class-validator'
import { plainToClass } from 'class-transformer'
import * as dotenv from 'dotenv'
import { ConfigDto } from './dto/config.dto'
import { CONFIG_MODULE_PATH } from './constant/config.constant'

@Injectable()
export class ConfigService {
  private readonly configDto: ConfigDto

  constructor(@Inject(CONFIG_MODULE_PATH) filePath: string) {
    const isExistFile = fs.existsSync(filePath)
    let rawConfigFile: DotenvParseOutput
    if (isExistFile) {
      rawConfigFile = parse(fs.readFileSync(filePath))
    } else {
      rawConfigFile = process.env
    }
    this.configDto = ConfigService.validateDto(rawConfigFile)
  }

  get config(): ConfigDto {
    return this.configDto
  }

  private static validateDto(rawConfigFile: dotenv.DotenvParseOutput): ConfigDto {
    const validator = new Validator()
    const transformed = plainToClass(ConfigDto, rawConfigFile)
    const validationErrors = validator.validateSync(transformed)
    if (validationErrors.length) {
      throw new Error(validationErrors.toString())
    }
    return transformed
  }
}
