import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from '../shared/shared.module';
import { DetailsComponent } from './containers/details/details.component';

import * as fromStore from './@store';
import { RepoContributorComponent } from './components/repo-contributor/repo-contributor.component';
import { RepoDetailsComponent } from './components/repo-details/repo-details.component';
import { RepoTitleComponent } from './components/repo-title/repo-title.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    DetailsComponent,
    RepoContributorComponent,
    RepoDetailsComponent,
    RepoTitleComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    StoreModule.forFeature('details', fromStore.reducers),
    EffectsModule.forFeature(fromStore.effects),
    FontAwesomeModule,
  ],
})
export class DetailsModule {}
