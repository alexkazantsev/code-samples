import { OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export abstract class Unsubscriber implements OnDestroy {
  protected unsubscribe$ = new Subject<void>();

  wrapToUnsubscribe(observable: Observable<any>): Observable<any> {
    return observable.pipe(takeUntil(this.unsubscribe$));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
