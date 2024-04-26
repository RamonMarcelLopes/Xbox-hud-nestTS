import { ApiProperty } from '@nestjs/swagger';
export class CreateProfileDto {
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
  @ApiProperty({
    description: 'Id do usuário',
    example: '3b140e0f-efdb-49f2-a39d-b28314ee20a9',
  })
  userId: string;
}
