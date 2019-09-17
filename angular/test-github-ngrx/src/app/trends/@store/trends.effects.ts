import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { loadTrends, loadTrendsFail, loadTrendsSuccess } from './trends.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { TrendsService } from '../services/trends.service';
import { of } from 'rxjs';
import { TrendRepo } from '../models/trend-repo.model';
import { mapToGithubRepo } from '../../shared/utils/map-trend-to-github';

@Injectable()
export class TrendsEffects {
  constructor(
    private actions$: Actions,
    private trendsService: TrendsService,
  ) {}

  @Effect()
  loadTrends$ = this.actions$.pipe(
    ofType(loadTrends.type),
    mergeMap(() => this.trendsService.loadTrends()
      .pipe(map((data: TrendRepo[]) => loadTrendsSuccess({ payload: data.map(mapToGithubRepo) })),
        catchError((error: Error) => of(loadTrendsFail(error))),
      )),
  );
}
