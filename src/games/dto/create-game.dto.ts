import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class CreateGameDto {
  @ApiProperty({
    description: 'adicionar um  titulo ',
    example: 'JACAGAME 4',
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'adicionar um link da  Imagem do jogo ',
    example: 'https://jacaimages.vercel.app/imgs/logos/jacareimage.png',
  })
  @IsNotEmpty()
  coverImageUrl: string;

  @ApiProperty({
    description: 'adicionar uma descricao ao game ',
    example: 'um jogo de jacare',
  })
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'adicionar o ano de lancamento do jogo ',
    example: 2018,
  })
  @IsNotEmpty()
  year: number;

  @ApiProperty({
    description: 'adicionar o  score do imdb do jogo ',
    example: 10,
  })
  @IsNotEmpty()
  imbScore: number;

  @ApiProperty({
    description: 'adicionar link do trailer do jogo no youtube  ',
    example: 'https://youtu.be/tWq1baquRGQ?si=rT84SMVCcLo7KjCT',
  })
  @IsNotEmpty()
  trailerYoutubeUrl: string;

  @ApiProperty({
    description: 'adicionar  link de gameplay  do jogo no youtube  ',
    example: 'https://youtu.be/tWq1baquRGQ?si=rT84SMVCcLo7KjCT',
  })
  @IsNotEmpty()
  gameplayYouTubeUrl: string;
  @ApiProperty({
    description: 'Gênero do jogo',
    example: 'FPS',
  })
  genreGame?: string;
}
