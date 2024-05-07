import { User } from './../user/entities/user.entity';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBasicAuth,
  ApiBearerAuth,
  ApiOperation,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoggedUser } from './logged-user.dercorator';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'realizar login recebendo um token de autenticacao',
  })
  login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    return this.authService.login(loginDto);
  }
  @Get()
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: 'Retornar o usuário autentificado no momento!',
  })
  @ApiSecurity('bearer')
  @ApiBearerAuth('JWT')
  @ApiBasicAuth('Login')
  profile(@LoggedUser() user: User) {
    return user;
  }
}
