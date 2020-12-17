import {
  IsArray,
  IsDefined,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IdMenuItemRequestDto } from '@modules/menu-item/dto/request/id-menu-item.request.dto';
import { ConstructableDto } from '@shared/dto';
import { OrderNewRequestDto } from '@modules/order/dto/request/order-new.request.dto';

export class OrderEditRequestDto extends ConstructableDto<OrderNewRequestDto> {
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
