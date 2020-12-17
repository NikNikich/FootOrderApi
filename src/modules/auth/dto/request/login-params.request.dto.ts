import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ConstructableDto } from '@shared/dto';

export class LoginParamsRequestDto extends ConstructableDto<LoginParamsRequestDto> {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @Transform((value) => value.trim().toLowerCase())
  @ApiProperty({ type: String, description: 'Email' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'Password' })
  password: string;
}
