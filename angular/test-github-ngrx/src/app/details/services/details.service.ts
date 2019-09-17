import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { GithubRepo } from '../../shared/models/github-repo.model';

@Injectable({ providedIn: 'root' })
export class DetailsService {
  constructor(private http: HttpClient) { }

  public loadRepoDetails(owner: string, repo: string): Observable<any> {
    return this.http.get(`${environment.githubApi}/repos/${owner}/${repo}`).pipe(
      map(data => data as GithubRepo),
    );
  }

  public loadContributorsDetails(owner: string, repo: string): Observable<any> {
    return this.http.get(`${environment.githubApi}/repos/${owner}/${repo}/contributors`);
  }

  public loadContributorFollowers(username: string): Observable<any> {
    return this.http.get(`${environment.githubApi}/users/${username}/followers`);
  }
}
