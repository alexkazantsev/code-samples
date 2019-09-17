import { Component, Input, OnInit } from '@angular/core';
import { GithubRepo } from '../../../shared/models/github-repo.model';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { Back } from '../../../@store/actions/router.actions';

@Component({
  selector: 'app-repo-details',
  templateUrl: './repo-details.component.html',
  styleUrls: ['./repo-details.component.scss'],
})
export class RepoDetailsComponent implements OnInit {

  backIcon = faChevronLeft;

  @Input() repo: GithubRepo;

  constructor(private store$: Store<void>) { }

  onBackClick(): void {
    this.store$.dispatch(Back());
  }

  ngOnInit() {}

}
