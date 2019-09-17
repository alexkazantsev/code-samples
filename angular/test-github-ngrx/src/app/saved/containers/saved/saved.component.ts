import { Component, OnInit } from '@angular/core';
import { ITrendsState } from '../../../trends/@store/trends.reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { removeRepo } from '../../../trends/@store/trends.actions';
import { getSavedRepos } from '../../@store/selectors/saved.selectors';
import { GithubRepo } from '../../../shared/models/github-repo.model';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.scss'],
})
export class SavedComponent implements OnInit {

  savedRepos$: Observable<GithubRepo[]>;

  constructor(private store$: Store<ITrendsState>) {
    this.savedRepos$ = this.store$.select(getSavedRepos);
  }

  onRemoveCLickHandler(repo: GithubRepo): void {
    this.store$.dispatch(removeRepo({ payload: repo }));
  }

  onRepoClickHandler(repo: GithubRepo): void {
    console.log(repo);
    /**
     * REDIRECT LOGIC
     */
  }

  ngOnInit() {}

}
