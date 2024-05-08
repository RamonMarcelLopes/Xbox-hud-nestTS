import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateProfileDto {
  @ApiProperty({
    description: 'Nome do perfil',
    example: 'Jaca[re]',
  })
  @IsNotEmpty()
  @IsOptional()
  title: string;
  @ApiProperty({
    description: 'Imagem de perfil',
    example: 'https://jacaimages.vercel.app/imgs/miscellaneous/dog.png',
  })
  @IsNotEmpty()
  @IsOptional()
  imageUrl: string;
}
