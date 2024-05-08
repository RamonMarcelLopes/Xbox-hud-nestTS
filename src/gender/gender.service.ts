import { User } from './../user/entities/user.entity';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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
  async create(user: User, createGenderDto: CreateGenderDto): Promise<Gender> {
    if (!user.isAdmin) {
      throw new UnauthorizedException(
        'apenas administradores podem criar novos generos',
      );
    }

    const gender = createGenderDto.name.toLocaleUpperCase();
    const genderToCreate: CreateGenderDto = {
      name: gender,
    };

    return await this.prisma.genres
      .create({
        data: genderToCreate,
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
    if (!record) {
      throw new NotFoundException(`registro com o id: ${id} não encontrado`);
    }
    return record;
  }

  async update(user: User, id: string, updateGenderDto: UpdateGenderDto) {
    await this.findOne(id);
    if (!user.isAdmin) {
      throw new UnauthorizedException(
        'apenas administradores podem editar generos',
      );
    }

    const data: string = updateGenderDto.name.toLocaleUpperCase();
    const dataToUpdate: UpdateGenderDto = {
      name: data,
    };

    return this.prisma.genres
      .update({
        data: dataToUpdate,
        where: { id },
        select: this.GenderSelect,
      })
      .catch(handleError);
  }

  async remove(user: User, id: string) {
    let genderDeleted = await this.findOne(id);
    if (!user.isAdmin) {
      throw new UnauthorizedException(
        'apenas administradores podem deletar generos',
      );
    }
    await this.prisma.genres.delete({ where: { id } }).catch(handleError);
    return `Genero ${genderDeleted.name} deletado com sucesso`;
  }
}
