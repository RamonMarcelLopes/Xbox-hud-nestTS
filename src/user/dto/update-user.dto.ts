import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    description: 'editar o  email ',
    example: 'testemail@mail.com',
  })
  @IsNotEmpty()
  @IsOptional()
  email: string;
  @ApiProperty({
    description: 'editar o  nome ',
    example: 'jacare',
  })
  @IsNotEmpty()
  @IsOptional()
  name: string;
  @ApiProperty({
    description: 'editar a senha ',
    example: 'jacare2024',
  })
  @IsNotEmpty()
  @IsOptional()
  password: string;
}
