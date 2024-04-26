import { ApiProperty } from '@nestjs/swagger';
export class RemoveGenreDto {
  @ApiProperty({
    description: 'nome do generro para remover',
    example: 'FPS',
  })
  genreGame: string;
}
