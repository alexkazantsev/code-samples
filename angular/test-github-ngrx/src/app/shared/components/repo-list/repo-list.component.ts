import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GithubRepo } from '../../models/github-repo.model';

@Component({
  selector: 'app-repo-list',
  templateUrl: './repo-list.component.html',
  styleUrls: ['./repo-list.component.scss'],
})
export class RepoListComponent implements OnInit {

  @Input() repos: GithubRepo[];
  @Input() showRemoveBtn = false;

  @Output() repoClick = new EventEmitter<GithubRepo>();
  @Output() removeClick = new EventEmitter<GithubRepo>();

  constructor() { }

  onRepoClick(repo: GithubRepo): void {
    this.repoClick.emit(repo);
  }

  onRemoveClick(repo: GithubRepo): void {
    this.removeClick.emit(repo);
  }

  ngOnInit() {}

}
