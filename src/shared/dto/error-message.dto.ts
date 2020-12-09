import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ErrorMessageDto {
  @ApiProperty({ type: String, description: 'Внутренний код' })
  code: number;

  @ApiProperty({ type: String, description: 'Текст ошибки' })
  message: string;

  @ApiPropertyOptional({
    type: String,
    description:
      'Свойство объекта по которому произошла ошибка валидации',
  })
  property?: string;
}
