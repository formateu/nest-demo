import { Body, Controller, Post } from '@nestjs/common';
import { GcTranslateService } from './gc-translate.service';
import { Observable } from 'rxjs';

@Controller('translate')
export class GcTranslateController {
  constructor(private readonly gcTranslateService: GcTranslateService) {}

  @Post()
  translate(
    @Body('text') text: string,
    @Body('targetLanguage') targetLanguage: string,
  ): Observable<string> {
    return this.gcTranslateService.translate(text, targetLanguage);
  }
}
