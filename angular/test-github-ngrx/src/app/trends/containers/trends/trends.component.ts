import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { TrendsFeatureState } from '../../@store';
import { loadTrends } from '../../@store/trends.actions';
import { Observable } from 'rxjs';
import { Unsubscriber } from '../../../shared/utils/unsubscriber';
import { getAllTrends, isLoaded, isProcessing } from '../../@store/trends.selectors';
import { Push } from '../../../@store/actions/router.actions';
import { GithubRepo } from '../../../shared/models/github-repo.model';

@Component({
  selector: 'app-trends',
  templateUrl: './trends.component.html',
  styleUrls: ['./trends.component.scss'],
})
export class TrendsComponent extends Unsubscriber implements OnInit {

  title = 'Trends';

  trends$: Observable<GithubRepo[]>;
  loaded$: Observable<boolean>;
  processing$: Observable<boolean>;

  constructor(private store: Store<TrendsFeatureState>) {
    super();

    this.trends$ = this.store.pipe(select(getAllTrends));
    this.loaded$ = this.store.pipe(select(isLoaded));
    this.processing$ = this.store.pipe(select(isProcessing));
  }

  onRepoClick(repo: GithubRepo): void {
    const { owner: { login: author }, name } = repo;
    this.store.dispatch(
      Push({ payload: { path: [`details`], queryParams: { author, name } } }),
    );
  }

  ngOnInit() {
    this.syncWithStore();
  }

  syncWithStore(): void {
    this.wrapToUnsubscribe(this.loaded$)
      .subscribe(loaded => {
        if (loaded) {
          return;
        }
        this.store.dispatch(loadTrends());
      });
  }

}
