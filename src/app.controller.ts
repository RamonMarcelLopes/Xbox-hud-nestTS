import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @ApiOperation({
    summary: 'Mostra o status da aplicação',
  })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
