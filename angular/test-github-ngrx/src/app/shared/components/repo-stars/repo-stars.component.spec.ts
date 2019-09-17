import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepoStarsComponent } from './repo-stars.component';

describe('RepoStarsComponent', () => {
  let component: RepoStarsComponent;
  let fixture: ComponentFixture<RepoStarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepoStarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepoStarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
