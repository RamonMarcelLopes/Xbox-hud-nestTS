import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class RemoveGenreDto {
  @ApiProperty({
    description: 'nome do generro para remover',
    example: 'FPS',
  })
  @IsNotEmpty()
  genreGame: string;
}
