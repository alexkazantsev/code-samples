import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { select, Store } from '@ngrx/store';
import * as fromRepoDetailsStore from 'src/app/details/@store';
import { GithubRepo } from 'src/app/shared/models/github-repo.model';
import { Observable } from 'rxjs';
import { GithubUser } from 'src/app/shared/models/github-user.model';
import { isContributorsLoaded, isDetailsLoaded, loadDetails } from 'src/app/details/@store';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {

  isDetailsLoaded$: Observable<boolean>;
  isContributorsLoaded$: Observable<boolean>;

  repoDetails$: Observable<GithubRepo>;
  repoContributors$: Observable<GithubUser[]>;


  constructor(
    private store: Store<fromRepoDetailsStore.RepoDetailsFeatureState>,
    private route: ActivatedRoute,
  ) {

    this.isDetailsLoaded$ = this.store.pipe(select(isDetailsLoaded));
    this.isContributorsLoaded$ = this.store.pipe(select(isContributorsLoaded));


    this.repoDetails$ = this.store.pipe(select(fromRepoDetailsStore.getRepoDetails));
    this.repoContributors$ = this.store.pipe(select(fromRepoDetailsStore.getRepoContributorsDetails));
  }

  ngOnInit() {
    const { author: owner, name: repo } = this.route.snapshot.queryParams;
    this.store.dispatch(loadDetails({ payload: { owner, repo } }));
  }

}
