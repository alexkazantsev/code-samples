import { Component, Input, OnInit } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-repo-stars',
  templateUrl: './repo-stars.component.html',
  styleUrls: ['./repo-stars.component.scss']
})
export class RepoStarsComponent implements OnInit {

  starIcon = faStar;

  @Input() stars: number;

  constructor() { }

  ngOnInit() {}

}
