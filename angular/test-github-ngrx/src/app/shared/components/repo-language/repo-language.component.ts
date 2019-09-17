import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-repo-language',
  templateUrl: './repo-language.component.html',
  styleUrls: ['./repo-language.component.scss'],
})
export class RepoLanguageComponent implements OnInit {

  @Input() language: string;
  @Input() languageColor: string;

  constructor() { }

  get lngStyle(): object {
    return { 'background-color': this.languageColor };
  }

  ngOnInit() {}

}
