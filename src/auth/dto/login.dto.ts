import { ApiProperty } from '@nestjs/swagger';
export class LoginDto {
  @ApiProperty({
    description: 'Email do usuário',
    example: 'xixorodeixo@gmail.com',
  })
  email: string;
  @ApiProperty({
    description: 'Senha do usuário',
    example: 'Xixo@24',
  })
  password: string;
}
