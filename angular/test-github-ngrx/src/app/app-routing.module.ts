import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TrendsComponent } from './trends/containers/trends/trends.component';
import { DetailsComponent } from './details/containers/details/details.component';
import { SavedComponent } from './saved/containers/saved/saved.component';

const routes: Routes = [
  { path: 'trends', component: TrendsComponent },
  { path: 'trends/saved', component: SavedComponent },
  { path: 'details', component: DetailsComponent },
  { path: '**', redirectTo: 'trends', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    enableTracing: true,
  })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
