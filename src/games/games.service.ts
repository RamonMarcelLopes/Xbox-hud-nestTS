import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Game } from './entities/game.entity';
import { handleError } from 'src/utils/error';

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
    const game: CreateGameDto = { ...createGameDto };
    return await this.prisma.games
      .create({
        data: game,
        select: this.GameSelect,
      })
      .catch(handleError);
  }

  async findAll() {
    const list = await this.prisma.games.findMany({
      select: this.GameSelect,
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
      select: this.GameSelect,
    });
    if (!id) {
      throw new NotFoundException(`registro com o id: ${id} não encontrado`);
    }
    return record;
  }

  async update(id: string, updateGameDto: UpdateGameDto) {
    await this.findOne(id);
    const data: UpdateGameDto = { ...updateGameDto };

    return this.prisma.games
      .update({
        data,
        where: { id },
        select: this.GameSelect,
      })
      .catch(handleError);
  }

  async remove(id: string) {
    let gameDeleted = await this.findOne(id);
    await this.prisma.games.delete({ where: { id } }).catch(handleError);
    return `Game ${gameDeleted.title} deletado com sucesso`;
  }
}
