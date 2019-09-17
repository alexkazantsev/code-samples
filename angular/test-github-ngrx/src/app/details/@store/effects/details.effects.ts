import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, debounceTime, switchMap, withLatestFrom } from 'rxjs/operators';
import { DetailsService } from '../../services/details.service';
import { forkJoin, of } from 'rxjs';

import { GithubUser } from 'src/app/shared/models/github-user.model';
import {
  loadAllFollowersSuccess,
  loadContributorFollowers,
  loadContributorFollowersFail,
  loadContributorFollowersSuccess,
  loadContributors,
  loadContributorsFail,
  loadContributorsSuccess,
  loadDetails,
  loadDetailsFail,
  loadDetailsSuccess,
} from '../actions';
import { RepoLanguagesService } from '../../../shared/services/repo-laguages.service.service';
import { Store } from '@ngrx/store';
import { RepoDetailsFeatureState } from '../reducers';
import { getRepoContributorsDetails } from '../selectors';


@Injectable()
export class DetailsEffects {
  constructor(
    private actions$: Actions,
    private store$: Store<RepoDetailsFeatureState>,
    private detailsService: DetailsService,
    private languagesService: RepoLanguagesService,
  ) { }

  @Effect()
  loadDetails$ = this.actions$.pipe(
    ofType(loadDetails.type),
    switchMap(({ payload: { owner, repo } }) => forkJoin([
      this.detailsService.loadRepoDetails(owner, repo),
      this.languagesService.getLanguages(),
      of({ owner, repo }),
    ])),
    switchMap(([githubRepo, languages, { owner, repo }]) => [
      loadDetailsSuccess({ payload: { ...githubRepo, languageColor: languages[githubRepo.language].color } }),
      loadContributors({ payload: { owner, repo } }),
    ]),
    catchError((error: Error) => of(loadDetailsFail({ payload: error }))),
  );

  @Effect()
  loadContributors$ = this.actions$.pipe(
    ofType(loadContributors.type),
    switchMap(({ payload: { owner, repo } }) => this.detailsService.loadContributorsDetails(owner, repo)
      .pipe(
        switchMap((users: GithubUser[]) => {
          const payload = users.filter(user => user.login !== owner);
          return [
            loadContributorsSuccess({ payload }),
            loadContributorFollowers(),
          ];
        }),
        catchError((error: Error) => of(loadContributorsFail({ payload: error }))),
      )),
  );

  // noinspection JSUnusedLocalSymbols
  @Effect()
  loadContributorFollowers$ = this.actions$.pipe(
    ofType(loadContributorFollowers.type),
    debounceTime(1000),
    withLatestFrom(this.store$.select(getRepoContributorsDetails)),
    switchMap(([action, contributors]) => {
      const contributor = contributors.find(c => !c.followers);
      if (contributor) {
        return this.detailsService.loadContributorFollowers(contributor.login)
          .pipe(
            switchMap((followers: GithubUser[]) => [
              loadContributorFollowersSuccess({ payload: { followers, id: contributor.id } }),
              loadContributorFollowers(),
            ]),
            catchError((error: Error) => of(loadContributorFollowersFail({ payload: error }))),
          );
      } else {
        return of(loadAllFollowersSuccess());
      }
    }),
  );
}
