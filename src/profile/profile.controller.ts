import { BuyGameDto } from './dto/buy-game.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @ApiOperation({
    summary: 'cria um novo perfil',
  })
  @Post()
  create(@Body() createProfileDto: CreateProfileDto) {
    return this.profileService.create(createProfileDto);
  }
  @ApiOperation({
    summary: 'lista todos os perfis cadastrados em todas as contas ',
  })
  @Get()
  findAll() {
    return this.profileService.findAll();
  }
  @ApiOperation({
    summary: 'lista um perfil cadastrado apartir de seu id ',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profileService.findOne(id);
  }
  @ApiOperation({
    summary: 'edita um perfil cadastrado apartir de seu id ',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(id, updateProfileDto);
  }
  ///
  @ApiOperation({
    summary: 'adicionar(comprar) um jogo para perfil ',
  })
  @Patch('buygame/:id')
  buyGame(@Param('id') id: string, @Body() buyGameDto: BuyGameDto) {
    return this.profileService.buyGame(id, buyGameDto);
  }
  ///
  @ApiOperation({
    summary: 'deleta um perfil cadastrado apartir de seu id ',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profileService.remove(id);
  }
}
