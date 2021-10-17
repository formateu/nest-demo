import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private helloMessage: string = 'This is NestJS usage demo by Mateusz Forc';

  getHello(): string {
    return this.helloMessage;
  }
}
