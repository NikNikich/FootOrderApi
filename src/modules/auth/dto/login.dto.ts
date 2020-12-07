import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginParamsDto {
  @IsNotEmpty()
  @IsString()
  @Transform((value) => value.trim().toLowerCase())
  @ApiProperty({ type: String, description: 'Email' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'Password' })
  password: string;
}
