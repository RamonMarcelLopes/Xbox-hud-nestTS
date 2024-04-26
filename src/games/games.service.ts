import { Injectable, NotFoundException } from '@nestjs/common';
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

  async create(createGameDto: CreateGameDto): Promise<Game> {
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
    if (!id) {
      throw new NotFoundException(`registro com o id: ${id} não encontrado`);
    }
    return record;
  }

  async update(id: string, updateGameDto: UpdateGameDto) {
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
          name: updateGameDto.genreGame.toUpperCase(),
        },
      },
    };

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
  async disconnect(id: string, removeGenreDto: RemoveGenreDto) {
    const gameToUpdate = await this.findOne(id);

    const index = gameToUpdate.genres.findIndex(
      (genre) => genre.name === removeGenreDto.genreGame.toUpperCase(),
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
  async remove(id: string) {
    let gameDeleted = await this.findOne(id);
    await this.prisma.games.delete({ where: { id } }).catch(handleError);
    return `Game ${gameDeleted.title} deletado com sucesso`;
  }
}
