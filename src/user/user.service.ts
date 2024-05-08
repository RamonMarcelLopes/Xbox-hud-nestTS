import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from './entities/user.entity';
import { handleError } from 'src/utils/error';
import { error } from 'console';
import * as bcrypt from 'bcrypt';

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
    profiles: true,
  };
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user: CreateUserDto = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    };

    return this.prisma.user
      .create({
        data: user,
        select: this.userSelect,
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
    if (!record) {
      throw new NotFoundException(`registro com o id: ${id} não encontrado`);
    }
    return record;
  }

  async update(user: User, updateUserDto: UpdateUserDto) {
    await this.findOne(user.id);
    let id = user.id;

    let data: UpdateUserDto = {
      ...updateUserDto,
    };
    if (updateUserDto.password) {
      data = {
        ...updateUserDto,
        password: await bcrypt.hash(updateUserDto.password, 10),
      };
    }
    return this.prisma.user.update({
      data,
      where: { id },
      select: this.userSelect,
    });
  }

  async remove(user: User) {
    let userDeleted = await this.findOne(user.id);
    let id = user.id;
    await this.prisma.user.delete({ where: { id } }).catch(handleError);
    return `Usuario ${userDeleted.name} deletado com sucesso`;
  }
}
