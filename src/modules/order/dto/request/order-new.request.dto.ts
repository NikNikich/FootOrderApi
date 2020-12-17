import {
  IsArray,
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ConstructableDto } from '@shared/dto';
import { IdMenuItemRequestDto } from '@modules/menu-item/dto/request/id-menu-item.request.dto';

export class OrderNewRequestDto extends ConstructableDto<OrderNewRequestDto> {
  @IsOptional()
  @IsString()
  @ApiProperty({ type: String, description: 'address text' })
  addressText?: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  @ApiProperty({ type: String, description: 'address id' })
  addressId?: number;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  @ApiProperty({ type: String, description: 'restaurant id' })
  restaurantId!: number;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: String, description: 'description order' })
  description?: string;

  @IsDefined()
  @ApiProperty({
    type: IdMenuItemRequestDto,
    description: 'Id menu item',
    isArray: true,
  })
  @IsArray()
  @Type(() => IdMenuItemRequestDto)
  @ValidateNested()
  MenuItem!: IdMenuItemRequestDto[];
}
