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
import { GenderService } from './gender.service';
import { CreateGenderDto } from './dto/create-gender.dto';
import { UpdateGenderDto } from './dto/update-gender.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Genero')
@UseGuards(AuthGuard())
@ApiBearerAuth('JWT')
@Controller('gender')
export class GenderController {
  constructor(private readonly genderService: GenderService) {}

  @ApiOperation({
    summary: 'cria um novo genero',
  })
  @Post()
  create(@Body() createGenderDto: CreateGenderDto) {
    return this.genderService.create(createGenderDto);
  }

  @ApiOperation({
    summary: 'lista todos os generos',
  })
  @Get()
  findAll() {
    return this.genderService.findAll();
  }

  @ApiOperation({
    summary: 'lista um genero apartir de seu id',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.genderService.findOne(id);
  }

  @ApiOperation({
    summary: 'edita um genero apartir de seu id',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGenderDto: UpdateGenderDto) {
    return this.genderService.update(id, updateGenderDto);
  }

  @ApiOperation({
    summary: 'deleta um genero apartir de seu id',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.genderService.remove(id);
  }
}
