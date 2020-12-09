import { ApiProperty } from '@nestjs/swagger';
import { ConstructableDto } from '@shared/dto/constructable.dto';

export class ListResponseDto<
  T = Record<string, unknown>
> extends ConstructableDto<ListResponseDto<T>> {
  @ApiProperty({ description: 'Selected data' })
  data!: T[];
}
