import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfileDto {
  @ApiProperty({
    description: 'Nome do perfil',
    example: 'Jaca[re]',
  })
  title: string;
  @ApiProperty({
    description: 'Imagem de perfil',
    example: 'https://jacaimages.vercel.app/imgs/miscellaneous/dog.png',
  })
  imageUrl: string;
}
