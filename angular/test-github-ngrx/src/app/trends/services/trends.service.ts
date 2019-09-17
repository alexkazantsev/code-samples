import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TrendsService {
  constructor(private http: HttpClient) {}

  public loadTrends(): Observable<any> {
    return this.http.get(`${environment.trendsApi}`);
  }
}
