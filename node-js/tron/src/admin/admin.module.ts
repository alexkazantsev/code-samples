import { Module } from '@nestjs/common';
import { AdminMainController } from './admin-main.controller';
import { AdminService } from './admin.service';
import { CoreModule } from '../core/core.module';
import { AdminTrxController } from './admin-trx.controller';
import { AdminUsdtController } from './admin-usdt.controller';
import { AdminDiceController } from './admin-dice.controller';

@Module({
  imports: [ CoreModule ],
  controllers: [
    AdminMainController,
    AdminTrxController,
    AdminUsdtController,
    AdminDiceController,
  ],
  providers: [ AdminService ],
  exports: [ AdminService ],
})
export class AdminModule {}
