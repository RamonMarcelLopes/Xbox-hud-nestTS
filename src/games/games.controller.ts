import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RemoveGenreDto } from './dto/remove-genre.dto';
@ApiTags('Games')
@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @ApiOperation({
    summary: 'adiciona um novo jogo no catalogo',
  })
  @Post()
  create(@Body() createGameDto: CreateGameDto) {
    return this.gamesService.create(createGameDto);
  }

  @ApiOperation({
    summary: 'lista todos os jogos do catalogo',
  })
  @Get()
  findAll() {
    return this.gamesService.findAll();
  }

  @ApiOperation({
    summary: 'lista um  jogo do catalogo apartir de seu id',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gamesService.findOne(id);
  }

  @ApiOperation({
    summary: 'edita um  jogo do catalogo apartir de seu id',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGameDto: UpdateGameDto) {
    return this.gamesService.update(id, updateGameDto);
  }

  @ApiOperation({
    summary: 'remove um genero do jogo apartir de seu nome ',
  })
  @Patch('removegenre/:id')
  disconnect(@Param('id') id: string, @Body() removeGenreDto: RemoveGenreDto) {
    return this.gamesService.disconnect(id, removeGenreDto);
  }

  @ApiOperation({
    summary: 'remove um  jogo do catalogo apartir de seu id',
  })
  @Delete('deletegame/:id')
  remove(@Param('id') id: string) {
    return this.gamesService.remove(id);
  }
}
