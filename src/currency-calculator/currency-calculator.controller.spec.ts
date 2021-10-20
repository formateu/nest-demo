import { Test, TestingModule } from '@nestjs/testing';
import { CurrencyCalculatorController } from './currency-calculator.controller';
import { CurrencyCalculatorService } from './currency-calculator.service';
import { of } from 'rxjs';
import { HttpModule } from '@nestjs/axios';

describe('CurrencyCalculatorController', () => {
  let controller: CurrencyCalculatorController;
  let ccservice: CurrencyCalculatorService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CurrencyCalculatorController],
      providers: [CurrencyCalculatorService],
      imports: [HttpModule],
    }).compile();

    ccservice = app.get<CurrencyCalculatorService>(CurrencyCalculatorService);
    controller = app.get<CurrencyCalculatorController>(
      CurrencyCalculatorController,
    );
  });

  describe('currencyCalculator/currency', () => {
    it('Should return current PLN to given currency rate"', () => {
      const mockCurrency = 'usd';
      const result = of(3);
      jest.spyOn(ccservice, 'getCurrencyRate').mockImplementation(() => result);
      expect(controller.getCurrencyRate(mockCurrency)).toBe(result);
    });
  });
});
