import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ConstructableDto } from '@shared/dto';

export class IdMenuItemRequestDto extends ConstructableDto<IdMenuItemRequestDto> {
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @ApiProperty({ type: Number, description: 'id item menu' })
  idMenuItem!: number;
}
