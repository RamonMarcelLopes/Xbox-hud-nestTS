import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';

export class LoginResponseDto {
  @ApiProperty({
    description: 'JWT gerado pelo login',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaWNrbmFtZSI6ImxhemFyb0tpbGxlciIsImlhdCI6MTY1NDEzNTM0NSwiZXhwIjoxNjU2NzI3MzQ1fQ.R7xXOclU88dyZKCPn6oSUHiFVRtl_RHxnR1QseOjoyE',
  })
  token: string;

  @ApiProperty({
    description: 'Dados do usuário autenticado',
  })
  user: User;
}
