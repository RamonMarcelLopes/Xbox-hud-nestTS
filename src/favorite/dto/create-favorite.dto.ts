import { ApiProperty } from '@nestjs/swagger';
export class CreateFavoriteDto {
  @ApiProperty({
    description: 'id do jogo que o jogo sera favoritado',
    example: '398a42f6-7429-4c23-a723-5332535ae2db',
  })
  gameId: string;
}
