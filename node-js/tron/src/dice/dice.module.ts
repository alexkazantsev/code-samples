import { Module } from '@nestjs/common';
import { DiceTrxController } from './dice-trx.controller';
import { DiceService } from './dice.service';
import { CoreModule } from '../core/core.module';
import { DiceUsdtController } from './dice-usdt.controller';

@Module({
  imports: [ CoreModule ],
  controllers: [
    DiceTrxController,
    DiceUsdtController,
  ],
  providers: [ DiceService ],
})
export class DiceModule {}
