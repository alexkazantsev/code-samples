import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TrendsModule } from './trends/trends.module';
import { DetailsModule } from './details/details.module';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { environment } from '../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { CustomSerializer } from './@store/reducers';
import { metaReducers } from './@store/reducers/meta.reducer';
import { SharedModule } from './shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterEffects } from './@store/effects/router.effects';
import { SavedModule } from './saved/saved.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TrendsModule,
    DetailsModule,
    SavedModule,
    SharedModule,

    NgbModule,
    FontAwesomeModule,

    StoreRouterConnectingModule.forRoot(),
    StoreModule.forRoot({}, { metaReducers }),
    EffectsModule.forRoot([RouterEffects]),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
  ],
  providers: [
    { provide: RouterStateSerializer, useClass: CustomSerializer },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
