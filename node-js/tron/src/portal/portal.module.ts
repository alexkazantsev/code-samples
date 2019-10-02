import { Module } from '@nestjs/common';
import { PortalController } from './portal.controller';
import { PortalService } from './portal.service';
import { CoreModule } from '../core/core.module';

@Module({
  imports: [ CoreModule ],
  controllers: [ PortalController ],
  providers: [ PortalService ],
  exports: [ PortalService ],
})
export class PortalModule {}
