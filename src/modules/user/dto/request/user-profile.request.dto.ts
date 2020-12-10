import {
  IsArray,
  IsOptional,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserProfileRequestDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ type: String, description: 'User full name' })
  fullName?: string;

  @IsOptional()
  @ApiProperty({
    type: Number,
    description: 'Id addresses',
    isArray: true,
  })
  @IsArray()
  @Type(() => IsPositive())
  @ValidateNested()
  idFavoriteAddresses?: number[];
}
