import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Server is running on port 3333   go to /api to see documentation ';
  }
}
