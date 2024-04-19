import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class CreateGenderDto {
  @ApiProperty({
    description: 'adicionar um nome para o genero ',
    example: 'corrida',
  })
  @IsNotEmpty()
  name: string;
}
