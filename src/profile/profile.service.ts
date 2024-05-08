import { User } from './../user/entities/user.entity';
import { BuyGameDto } from './dto/buy-game.dto';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/error';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}
  async create(user: User, createProfileDto: CreateProfileDto) {
    const data: Prisma.ProfileCreateInput = {
      user: {
        connect: {
          id: user.id,
        },
      },
      title: createProfileDto.title,
      imageUrl: createProfileDto.imageUrl,
    };
    return await this.prisma.profile
      .create({
        data,
      })
      .catch(handleError);
  }

  async findAll() {
    return await this.prisma.profile.findMany({
      select: {
        id: true,
        imageUrl: true,
        title: true,
        user: {
          select: {
            name: true,
            email: true,
            isAdmin: true,
            id: true,
          },
        },
        games: true,
        favoriteGames: true,
      },
    });
  }
  async buyGame(user: User, id: string, buyGameDto: BuyGameDto) {
    let findProfile = await this.findOne(id);

    if (findProfile.user.id != user.id) {
      throw new UnauthorizedException(
        'você não tem permissão para editar este perfil',
      );
    }
    const data = {
      games: {
        connect: {
          id: buyGameDto.gameId,
        },
      },
    };
    return this.prisma.profile
      .update({
        where: { id },
        data,
        include: {
          games: true,
        },
      })
      .catch(handleError);
  }
  async findOne(id: string) {
    const record = await this.prisma.profile.findUnique({
      where: { id },
      select: {
        id: true,
        imageUrl: true,
        title: true,
        user: {
          select: {
            name: true,
            email: true,
            isAdmin: true,
            id: true,
          },
        },
        games: true,
        favoriteGames: true,
      },
    });
    if (!record) {
      throw new NotFoundException(`Registro com o Id ${id} não encontrado.`);
    }
    return record;
  }

  async update(user: User, id: string, updateProfileDto: UpdateProfileDto) {
    let findProfile = await this.findOne(id);

    if (findProfile.user.id != user.id) {
      throw new UnauthorizedException(
        'você não tem permissão para editar este perfil',
      );
    }
    const data: Prisma.ProfileUpdateInput = {
      title: updateProfileDto.title,
      imageUrl: updateProfileDto.imageUrl,
    };
    return this.prisma.profile
      .update({
        where: { id },
        data,
      })
      .catch(handleError);
  }

  async remove(user: User, id: string) {
    let findProfile = await this.findOne(id);

    if (findProfile.user.id != user.id) {
      throw new UnauthorizedException(
        'você não tem permissão para Deletar este perfil',
      );
    }

    await this.prisma.profile
      .delete({
        where: { id },
      })
      .catch(handleError);
    return `perfil ${findProfile.title} deletado com sucesso`;
  }
}
