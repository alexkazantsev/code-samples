import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RepoLanguagesService {

  constructor(private http: HttpClient) { }

  getLanguages(): Observable<any> {
    return this.http.get('./assets/languages.json');
  }
}
