import { Component, OnInit } from '@angular/core';
import { faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-empty-list',
  templateUrl: './empty-list.component.html',
  styleUrls: ['./empty-list.component.scss'],
})
export class EmptyListComponent implements OnInit {

  private icon = faStarHalfAlt;

  constructor() { }

  ngOnInit() {}

}
