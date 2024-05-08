import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { ProfileService } from 'src/profile/profile.service';
import { handleError } from 'src/utils/error';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class FavoriteService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly profile: ProfileService,
  ) {}
  async create(user: User, id: string, createFavoriteDto: CreateFavoriteDto) {
    const perfil = await this.profile.findOne(id);

    if (perfil.user.id != user.id) {
      throw new UnauthorizedException(
        'voce so pode favoritar jogos para voce mesmo ',
      );
    }

    let verify = perfil.games.some(
      (game) => game.id === createFavoriteDto.gameId,
    );

    if (!verify) {
      throw new BadRequestException('voce nao possui esse jogo');
    }

    let editavel = perfil.favoriteGames.some(
      (game) => game.id === createFavoriteDto.gameId,
    );

    if (!editavel) {
      const data: Prisma.ProfileUpdateInput = {
        favoriteGames: {
          connect: {
            id: createFavoriteDto.gameId,
          },
        },
      };
      return await this.prisma.profile
        .update({
          where: { id },
          data,
          include: { favoriteGames: true },
        })
        .catch(handleError);
    } else {
      const data: Prisma.ProfileUpdateInput = {
        favoriteGames: {
          disconnect: {
            id: createFavoriteDto.gameId,
          },
        },
      };
      return await this.prisma.profile
        .update({
          where: { id },
          data,
          include: { favoriteGames: true },
        })
        .catch(handleError);
    }
  }

  async findAll(user: User, id: string) {
    const perfil = await this.profile.findOne(id);
    return perfil.favoriteGames;
  }
}
