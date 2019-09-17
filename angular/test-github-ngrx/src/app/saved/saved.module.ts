import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { reducers } from './@store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { SavedEffects } from './@store/effects/saved.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature('saved', reducers),
    EffectsModule.forFeature([SavedEffects]),
  ],
})
export class SavedModule {}
