import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class CreateUserDto {
  @ApiProperty({
    description: 'adicionar um  email ',
    example: 'testemail@mail.com',
  })
  @IsNotEmpty()
  email: string;
  @ApiProperty({
    description: 'adicionar um  name ',
    example: 'jacare',
  })
  @IsNotEmpty()
  name: string;
  @ApiProperty({
    description: 'adicionar uma senha ',
    example: 'jacare2024',
  })
  @IsNotEmpty()
  password: string;
  @ApiProperty({
    description: 'adicionar um  cpf ',
    example: '123.456.789-10',
  })
  @IsNotEmpty()
  cpf: string;
}
