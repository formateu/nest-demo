import { Controller, Body, Get, Param } from '@nestjs/common';
import { Observable } from 'rxjs';

import { CurrencyCalculatorService } from './currency-calculator.service';

@Controller('currencyCalculator')
export class CurrencyCalculatorController {
  constructor(private readonly currCalcService: CurrencyCalculatorService) {}

  @Get(':currency')
  getCurrencyRate(@Param('currency') currency: string): Observable<number> {
    return this.currCalcService.getCurrencyRate(currency);
  }
}
