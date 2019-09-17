import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TrendsFeatureState } from './trends/@store';
import { Observable } from 'rxjs';
import { getSavedRepos } from './saved/@store/selectors/saved.selectors';
import { GithubRepo } from './shared/models/github-repo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  public savedRepos$: Observable<GithubRepo[]>;

  constructor(
    private router: Router,
    private store: Store<TrendsFeatureState>,
  ) {
    this.savedRepos$ = this.store.select(getSavedRepos);
    this.subscribeToNavigate();
  }

  public subscribeToNavigate(): void {
    this.router.events.subscribe((event) => console.log(event));
  }
}
