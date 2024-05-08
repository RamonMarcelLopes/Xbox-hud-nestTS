import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    console.log('server is running on port http://localhost:3333');
    return 'Server is running on port 3333   go to http://localhost:3333/api to see documentation ';
  }
}
