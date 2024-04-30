import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('Favorite')
@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}
  @ApiOperation({
    summary: 'adiciona ou remove um jogo dos favoritos do perfil',
  })
  @Patch('or-unfavorite:id')
  create(
    @Param('id') id: string,
    @Body() createFavoriteDto: CreateFavoriteDto,
  ) {
    return this.favoriteService.create(id, createFavoriteDto);
  }
  @ApiOperation({
    summary: 'lista todos os jogos  favoritos do perfil apartir de seu id ',
  })
  @Get(':id')
  findAll(@Param('id') id: string) {
    return this.favoriteService.findAll(id);
  }
}
