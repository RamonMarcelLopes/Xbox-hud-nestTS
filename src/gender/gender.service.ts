import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGenderDto } from './dto/create-gender.dto';
import { UpdateGenderDto } from './dto/update-gender.dto';
import { Gender } from './entities/gender.entity';
import { handleError } from 'src/utils/error';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GenderService {
  private GenderSelect = {
    id: true,
    name: true,
    createdAt: false,
    updatedAt: false,
  };
  constructor(private readonly prisma: PrismaService) {}
  async create(createGenderDto: CreateGenderDto): Promise<Gender> {
    const gender: CreateGenderDto = { ...createGenderDto };
    return await this.prisma.genres
      .create({
        data: gender,
        select: this.GenderSelect,
      })
      .catch(handleError);
  }

  async findAll() {
    const list = await this.prisma.genres.findMany({
      select: this.GenderSelect,
    });
    if (list.length === 0) {
      throw new NotFoundException('Não existem generos cadastrados ainda');
    } else {
      return list;
    }
  }

  async findOne(id: string) {
    const record = await this.prisma.genres.findUnique({
      where: { id },
      select: this.GenderSelect,
    });
    if (!id) {
      throw new NotFoundException(`registro com o id: ${id} não encontrado`);
    }
    return record;
  }

  async update(id: string, updateGenderDto: UpdateGenderDto) {
    await this.findOne(id);
    const data: UpdateGenderDto = { ...updateGenderDto };

    return this.prisma.genres
      .update({
        data,
        where: { id },
        select: this.GenderSelect,
      })
      .catch(handleError);
  }

  async remove(id: string) {
    let genderDeleted = await this.findOne(id);
    await this.prisma.genres.delete({ where: { id } }).catch(handleError);
    return `Genero ${genderDeleted.name} deletado com sucesso`;
  }
}
