import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { DiceModule } from './dice/dice.module';
import { AdminModule } from './admin/admin.module';
import { PortalModule } from './portal/portal.module';
import { StakeModule } from './stake/stake.module';

@Module({
  imports: [
    CoreModule,
    DiceModule,
    AdminModule,
    PortalModule,
    StakeModule,
  ],
  controllers: [],
  providers: [ CoreModule ],
})
export class AppModule {}
