import { User } from './../user/entities/user.entity';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Game } from './entities/game.entity';
import { handleError } from 'src/utils/error';
import { Prisma } from '@prisma/client';
import { RemoveGenreDto } from './dto/remove-genre.dto';

@Injectable()
export class GamesService {
  private GameSelect = {
    id: true,
    title: true,
    coverImageUrl: true,
    description: true,
    year: true,
    imbScore: true,
    trailerYoutubeUrl: true,
    gameplayYouTubeUrl: true,
    createdAt: false,
    updatedAt: false,
  };
  constructor(private readonly prisma: PrismaService) {}

  async create(user: User, createGameDto: CreateGameDto): Promise<Game> {
    if (!user.isAdmin) {
      throw new UnauthorizedException(
        'so administradores podem adicionar jogos ao catalogo',
      );
    }

    const game: Prisma.GamesCreateInput = {
      title: createGameDto.title,
      coverImageUrl: createGameDto.coverImageUrl,
      year: createGameDto.year,
      description: createGameDto.description,
      imbScore: createGameDto.imbScore,
      gameplayYouTubeUrl: createGameDto.gameplayYouTubeUrl,
      trailerYoutubeUrl: createGameDto.trailerYoutubeUrl,
      genres: {
        connect: {
          name: createGameDto.genreGame.toUpperCase(),
        },
      },
    };
    return await this.prisma.games
      .create({
        data: game,
        include: {
          genres: true,
        },
      })
      .catch(handleError);
  }

  async findAll() {
    const list = await this.prisma.games.findMany({
      // select: this.GameSelect,
      include: {
        genres: true,
      },
    });
    if (list.length === 0) {
      throw new NotFoundException('Não existem jogos cadastrados ainda');
    } else {
      return list;
    }
  }

  async findOne(id: string) {
    const record = await this.prisma.games.findUnique({
      where: { id },
      include: {
        genres: true,
      },
    });
    if (!record) {
      throw new NotFoundException(`registro com o id: ${id} não encontrado`);
    }
    return record;
  }

  async update(user: User, id: string, updateGameDto: UpdateGameDto) {
    await this.findOne(id);
    if (!user.isAdmin) {
      throw new UnauthorizedException(
        'so administradores podem editar jogos do catalogo',
      );
    }
    let genreName = updateGameDto.genreGame;
    if (updateGameDto.genreGame) {
      genreName = updateGameDto.genreGame.toUpperCase();
    }
    const data: Prisma.GamesUpdateInput = {
      title: updateGameDto.title,
      coverImageUrl: updateGameDto.coverImageUrl,
      year: updateGameDto.year,
      description: updateGameDto.description,
      imbScore: updateGameDto.imbScore,
      gameplayYouTubeUrl: updateGameDto.gameplayYouTubeUrl,
      trailerYoutubeUrl: updateGameDto.trailerYoutubeUrl,
      genres: {
        connect: {
          name: genreName,
        },
      },
    };
    function removeUndefinedProps(obj: any) {
      for (const key in obj) {
        if (obj[key] === undefined) {
          delete obj[key];
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
          removeUndefinedProps(obj[key]);
        }
      }
    }
    removeUndefinedProps(data);

    const isGenresConnectEmpty = Object.keys(data.genres.connect).length === 0;
    if (isGenresConnectEmpty) {
      delete data.genres;
    }

    return this.prisma.games
      .update({
        where: { id },
        data,
        include: {
          genres: true,
        },
      })
      .catch(handleError);
  }
  async disconnect(user: User, id: string, removeGenreDto: RemoveGenreDto) {
    const gameToUpdate = await this.findOne(id);

    if (!user.isAdmin) {
      throw new UnauthorizedException(
        'so administradores podem editar jogos do catalogo',
      );
    }

    let genreGame = removeGenreDto.genreGame.toUpperCase();
    const index = gameToUpdate.genres.findIndex(
      (genre) => genre.name === genreGame,
    );
    if (index !== -1) {
      const data = {
        genres: {
          disconnect: {
            name: gameToUpdate.genres[index].name,
          },
        },
      };
      return this.prisma.games.update({
        where: { id },
        data,
        include: {
          genres: true,
        },
      });
    } else {
      throw new NotFoundException(`genero não encontrado`);
    }
  }
  async remove(user: User, id: string) {
    if (!user.isAdmin) {
      throw new UnauthorizedException(
        'so administradores podem remover  jogos do catalogo',
      );
    }
    let gameDeleted = await this.findOne(id);
    await this.prisma.games.delete({ where: { id } }).catch(handleError);
    return `Game ${gameDeleted.title} deletado com sucesso`;
  }
}
