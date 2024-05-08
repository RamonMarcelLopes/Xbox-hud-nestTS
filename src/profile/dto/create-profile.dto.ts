import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class CreateProfileDto {
  @ApiProperty({
    description: 'Nome do perfil',
    example: 'Jaca[re]',
  })
  @IsNotEmpty()
  title: string;
  @ApiProperty({
    description: 'Imagem de perfil',
    example: 'https://jacaimages.vercel.app/imgs/miscellaneous/dog.png',
  })
  @IsNotEmpty()
  imageUrl: string;
}
