import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from './entities/user.entity';
import { handleError } from 'src/utils/error';
import { error } from 'console';

@Injectable()
export class UserService {
  private userSelect = {
    id: true,
    name: true,
    email: true,
    password: false,
    cpf: true,
    isAdmin: true,
    createdAt: true,
    updatedAt: false,
  };
  constructor(private readonly prisma: PrismaService) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const user: CreateUserDto = { ...createUserDto };
    return this.prisma.user
      .create({
        data: user,
      })
      .catch(handleError);
  }

  async findAll() {
    const list = await this.prisma.user.findMany({
      select: this.userSelect,
    });
    if (list.length === 0) {
      throw new NotFoundException('Não existem usuários cadastrados ainda');
    } else {
      return list;
    }
  }

  async findOne(id: string) {
    const record = await this.prisma.user.findUnique({
      where: { id },
      select: this.userSelect,
    });
    if (!id) {
      throw new NotFoundException(`registro com o id: ${id} não encontrado`);
    }
    return record;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.findOne(id);
    const data: UpdateUserDto = { ...updateUserDto };
    return this.prisma.user.update({
      data,
      where: { id },
      select: this.userSelect,
    });
  }

  async remove(id: string) {
    let userDeleted = await this.findOne(id);
    await this.prisma.user.delete({ where: { id } }).catch(handleError);
    return `Usuario ${userDeleted.name} deletado com sucesso`;
  }
}
