import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GithubRepo } from '../../models/github-repo.model';

@Component({
  selector: 'app-github-repo',
  templateUrl: './github-repo.component.html',
  styleUrls: ['./github-repo.component.scss'],
})
export class GithubRepoComponent implements OnInit {

  @Input() repo: GithubRepo;
  @Input() showRemoveBtn: boolean;

  @Output() clickHandler = new EventEmitter<GithubRepo>();
  @Output() removeClick = new EventEmitter();

  constructor() { }

  onHeaderClickHandler() {
    this.clickHandler.emit(this.repo);
  }

  onRemoveClickHandler(): void {
    this.removeClick.emit();
  }

  ngOnInit() {}
}
