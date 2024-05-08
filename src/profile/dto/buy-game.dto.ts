import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class BuyGameDto {
  @ApiProperty({
    description: 'id do jogo que esta sendo comprado',
    example: '398a42f6-7429-4c23-a723-5332535ae2db',
  })
  @IsNotEmpty()
  gameId: string;
}
