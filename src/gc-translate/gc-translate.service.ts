import { Injectable } from '@nestjs/common';
import { v2 } from '@google-cloud/translate';
import { from, map, pipe, Observable } from 'rxjs';

@Injectable()
export class GcTranslateService {
  readonly sourceLang: string;

  constructor() {
    this.sourceLang = 'pl';
  }

  translate(text: string, targetLanguage: string): Observable<string> {
    const translateConfig = {
      key: 'AIzaSyD1JSsHDU-ETy2sMrEiv4v4yNI5LxoPGh8',
    };

    const translateClient = new v2.Translate(translateConfig);

    return from(
      translateClient.translate(text, {
        from: this.sourceLang,
        to: targetLanguage,
      }),
    ).pipe(
      map(([result, _]) => {
        return result;
      }),
    );
  }
}
