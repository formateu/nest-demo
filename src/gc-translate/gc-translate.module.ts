import { Module } from '@nestjs/common';
import { GcTranslateController } from './gc-translate.controller';
import { GcTranslateService } from './gc-translate.service';

@Module({
  controllers: [GcTranslateController],
  providers: [GcTranslateService],
})
export class GcTranslateModule {}
