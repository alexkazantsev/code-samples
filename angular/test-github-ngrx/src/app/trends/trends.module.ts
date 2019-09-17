import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrendsComponent } from './containers/trends/trends.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TrendsEffects } from './@store/trends.effects';
import { reducers } from './@store';
import { SharedModule } from '../shared/shared.module';
import { SavedComponent } from '../saved/containers/saved/saved.component';

@NgModule({
  declarations: [TrendsComponent, SavedComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    StoreModule.forFeature('trends', reducers.trendsReducer),
    EffectsModule.forFeature([TrendsEffects]),
  ],
})
export class TrendsModule {}
