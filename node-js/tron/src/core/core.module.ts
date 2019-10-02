import { Module } from '@nestjs/common';
import { TronService } from './tron.service';

@Module({
  providers: [ TronService ],
  exports: [ TronService ],
})
export class CoreModule {}
