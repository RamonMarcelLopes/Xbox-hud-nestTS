import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RemoveGenreDto } from './dto/remove-genre.dto';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from 'src/auth/logged-user.dercorator';
import { User } from 'src/user/entities/user.entity';
@ApiTags('Games')
@UseGuards(AuthGuard())
@ApiBearerAuth('JWT')
@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @ApiOperation({
    summary: 'adiciona um novo jogo no catalogo',
  })
  @Post()
  create(@LoggedUser() user: User, @Body() createGameDto: CreateGameDto) {
    return this.gamesService.create(user, createGameDto);
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
  update(
    @LoggedUser() user: User,
    @Param('id') id: string,
    @Body() updateGameDto: UpdateGameDto,
  ) {
    return this.gamesService.update(user, id, updateGameDto);
  }

  @ApiOperation({
    summary: 'remove um genero do jogo apartir de seu nome ',
  })
  @Patch('removegenre/:id')
  disconnect(
    @LoggedUser() user: User,
    @Param('id') id: string,
    @Body() removeGenreDto: RemoveGenreDto,
  ) {
    return this.gamesService.disconnect(user, id, removeGenreDto);
  }

  @ApiOperation({
    summary: 'remove um  jogo do catalogo apartir de seu id',
  })
  @Delete('deletegame/:id')
  remove(@LoggedUser() user: User, @Param('id') id: string) {
    return this.gamesService.remove(user, id);
  }
}
