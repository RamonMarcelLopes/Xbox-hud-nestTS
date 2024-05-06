import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  async login(loginDto: LoginDto): Promise<LoginResponseDto | any> {
    const { email, password } = loginDto;

    const user = await this.prisma.user.findUnique({ where: { email } });

    const isHashValid = await bcrypt.compare(password, user.password);

    if (!user) {
      throw new UnauthorizedException('Usuário e/ou senha inválidos');
    }
    delete user.password;

    return {
      token: this.jwtService.sign({ email }),
      user,
    };
  }
}
