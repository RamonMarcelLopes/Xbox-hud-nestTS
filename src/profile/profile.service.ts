import { BuyGameDto } from './dto/buy-game.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/error';
import { connect } from 'http2';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createProfileDto: CreateProfileDto) {
    const data: Prisma.ProfileCreateInput = {
      user: {
        connect: {
          id: createProfileDto.userId,
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
          },
        },
        games: true,
      },
    });
  }
  async buyGame(id: string, buyGameDto: BuyGameDto) {
    await this.findOne(id);
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
          },
        },
        games: true,
      },
    });
    if (!record) {
      throw new NotFoundException(`Registro com o Id ${id} não encontrado.`);
    }
    return record;
  }

  async update(id: string, updateProfileDto: UpdateProfileDto) {
    await this.findOne(id);
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

  async remove(id: string) {
    let profileToDelete = await this.findOne(id);
    await this.prisma.profile
      .delete({
        where: { id },
      })
      .catch(handleError);
    return `perfil ${profileToDelete.title} deletado com sucesso`;
  }
}
