import { Component, OnInit, Input } from '@angular/core';
import { GithubUser } from 'src/app/shared/models/github-user.model';

@Component({
  selector: 'app-repo-contributor',
  templateUrl: './repo-contributor.component.html',
  styleUrls: ['./repo-contributor.component.scss']
})
export class RepoContributorComponent implements OnInit {

  @Input() contributor: GithubUser;

  constructor() { }

  ngOnInit() {
  }

}
