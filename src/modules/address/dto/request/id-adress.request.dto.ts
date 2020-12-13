import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class IdAddressDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @ApiProperty({ type: Number, description: 'id address' })
  id: number;
}
