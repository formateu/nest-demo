import { Module } from '@nestjs/common';
import { CurrencyCalculatorService } from './currency-calculator.service';
import { CurrencyCalculatorController } from './currency-calculator.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [CurrencyCalculatorController],
  providers: [CurrencyCalculatorService],
})
export class CurrencyCalculatorModule {}
