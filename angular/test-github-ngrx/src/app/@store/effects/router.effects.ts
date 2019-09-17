import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Back, Forward, Push, RouteProps } from '../actions/router.actions';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class RouterEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location,
  ) {}

  @Effect({ dispatch: false })
  push$ = this.actions$.pipe(
    ofType(Push.type),
    map((action: RouteProps) => action.payload),
    tap(({ path, extras, queryParams }) => this.router.navigate(path, { queryParams, ...extras })),
  );

  @Effect({ dispatch: false })
  back$ = this.actions$.pipe(
    ofType(Back.type),
    tap(() => this.location.back()),
  );

  @Effect({ dispatch: false })
  forward$ = this.actions$.pipe(
    ofType(Forward.type),
    tap(() => this.location.forward()),
  );
}
