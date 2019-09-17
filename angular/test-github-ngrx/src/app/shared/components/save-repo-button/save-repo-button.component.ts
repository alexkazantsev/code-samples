import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ITrendsState } from '../../../trends/@store/trends.reducers';

import { GithubRepo } from '../../models/github-repo.model';
import { saveRepo } from '../../../saved/@store/actions/saved.actions';
import { Observable } from 'rxjs';
import { isRepoSaved } from '../../../saved/@store/selectors/saved.selectors';

@Component({
  selector: 'app-save-repo-button',
  templateUrl: './save-repo-button.component.html',
  styleUrls: ['./save-repo-button.component.scss'],
})
export class SaveRepoButtonComponent implements OnInit {

  @Input() readonly repo: GithubRepo;

  isSaved$: Observable<boolean>;

  constructor(private store$: Store<ITrendsState>) {}

  onSaveClick(): void {
    this.store$.dispatch(saveRepo({ payload: this.repo }));
  }

  ngOnInit(): void {
    this.isSaved$ = this.store$.select(isRepoSaved, { full_name: this.repo.full_name });
  }

}
