import { Module } from '@nestjs/common';
import { StakeController } from './stake.controller';
import { StakeService } from './stake.service';
import { CoreModule } from '../core/core.module';

@Module({
  imports: [ CoreModule ],
  controllers: [ StakeController ],
  providers: [ StakeService ],
  exports: [ StakeService ],
})
export class StakeModule {}
