import { HttpException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { ConstructableDto } from './constructable.dto';
import { ErrorMessageDto } from './error-message.dto';

export class ErrorDto extends ConstructableDto<ErrorDto> {
  @ApiProperty({
    type: String,
    description: 'HTTP статус в виде строки',
  })
  readonly error: string;

  @ApiProperty({ type: Number, description: 'HTTP код' })
  readonly statusCode: number;

  @ApiProperty({
    type: [ErrorMessageDto],
    description: 'Сообщение об ошибке',
  })
  readonly message: ErrorMessageDto[];

  exception(customMessage?: string): HttpException {
    return new HttpException(
      {
        error: this.error,
        statusCode: this.statusCode,
        message: customMessage || this.message,
      },
      this.statusCode,
    );
  }
}
