import {
  IsArray,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IdAddressDto } from '@modules/address/dto/request/id-adress.request.dto';
import { ConstructableDto } from '@shared/dto';

export class UserProfileRequestDto extends ConstructableDto<UserProfileRequestDto> {
  @IsOptional()
  @IsString()
  @ApiProperty({ type: String, description: 'User full name' })
  fullName?: string;

  @IsOptional()
  @ApiProperty({
    type: IdAddressDto,
    description: 'Id addresses',
    isArray: true,
  })
  @IsArray()
  @Type(() => IdAddressDto)
  @ValidateNested()
  idFavoriteAddresses?: IdAddressDto[];
}
