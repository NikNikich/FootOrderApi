import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ConstructableDto } from '@shared/dto';

export class IdAddressDto extends ConstructableDto<IdAddressDto> {
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @ApiProperty({ type: Number, description: 'id address' })
  idAddress!: number;
}
