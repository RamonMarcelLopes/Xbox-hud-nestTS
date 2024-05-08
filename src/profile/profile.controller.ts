import { User } from './../user/entities/user.entity';
import { BuyGameDto } from './dto/buy-game.dto';
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
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from 'src/auth/logged-user.dercorator';

@ApiTags('Profile')
@UseGuards(AuthGuard())
@ApiBearerAuth('JWT')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @ApiOperation({
    summary: 'cria um novo perfil',
  })
  @Post()
  create(@LoggedUser() user: User, @Body() createProfileDto: CreateProfileDto) {
    return this.profileService.create(user, createProfileDto);
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
  buyGame(
    @LoggedUser() user: User,
    @Param('id') id: string,
    @Body() buyGameDto: BuyGameDto,
  ) {
    return this.profileService.buyGame(user, id, buyGameDto);
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
