import { createAction, props } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';

export interface RouterParams {
  path: any[];
  queryParams?: object;
  extras?: NavigationExtras;
}

export interface RouteProps {
  payload: RouterParams;
}

export const Push = createAction('[Router] Push', props<RouteProps>());

export const Back = createAction('[Router] Back');

export const Forward = createAction('[Router] Forward');
