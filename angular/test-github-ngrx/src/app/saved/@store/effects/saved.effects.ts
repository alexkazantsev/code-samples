import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { saveRepo, saveRepoFail, saveRepoSuccess } from '../actions/saved.actions';
import { switchMap, withLatestFrom } from 'rxjs/operators';
import { SavedReposFeatureState } from '../reducers';
import { of } from 'rxjs';
import { getSavedRepos } from '../selectors/saved.selectors';

@Injectable()
export class SavedEffects {
  constructor(
    private actions$: Actions,
    private store$: Store<SavedReposFeatureState>,
  ) {}

  @Effect()
  saveRepo$ = this.actions$.pipe(
    ofType(saveRepo),
    withLatestFrom(this.store$.select(getSavedRepos)),
    switchMap(([{ payload }, state]) => {
      const repo = state.find(r => r.full_name === payload.full_name);
      if (!repo) {
        return of(saveRepoSuccess({ payload }));
      }
      return of(saveRepoFail());
    }),
  );
}
