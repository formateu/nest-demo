import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { response } from 'express';
import { map } from 'rxjs';

@Injectable()
export class CurrencyCalculatorService {
    constructor(private httpService: HttpService) { }

    getCurrencyRate(currency: string): Observable<any> {
        const nbpUrl = `http://api.nbp.pl/api/exchangerates/rates/a/${currency}/`;
        console.log(nbpUrl);
        return this.httpService.get(nbpUrl).pipe(map((response) => {
            const rateData = response.data['rates'][0];
            const rate = rateData['mid'];
            return rate;
        }));
    }
}