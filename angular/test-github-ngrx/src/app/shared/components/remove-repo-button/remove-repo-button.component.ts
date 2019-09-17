import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-remove-repo-button',
  templateUrl: './remove-repo-button.component.html',
  styleUrls: ['./remove-repo-button.component.scss'],
})
export class RemoveRepoButtonComponent implements OnInit {

  @Output() removeClick = new EventEmitter<any>();

  constructor() { }

  private onRemoveClick() {
    this.removeClick.emit();
  }

  ngOnInit() {}

}
