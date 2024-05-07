import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  async login(loginDto: LoginDto): Promise<LoginResponseDto | any> {
    const { email, password } = loginDto;

    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('Usuário e/ou senha inválidos');
    }
    let userId = user.id;

    const isHashValid = await bcrypt.compare(password, user.password);

    if (isHashValid) {
      delete user.password;

      return {
        token: this.jwtService.sign({ email, userId }),
        user,
      };
    } else {
      throw new UnauthorizedException('invalid credentials');
    }
  }
}
