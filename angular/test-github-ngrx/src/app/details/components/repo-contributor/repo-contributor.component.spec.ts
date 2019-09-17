import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepoContributorComponent } from './repo-contributor.component';

describe('RepoContributorComponent', () => {
  let component: RepoContributorComponent;
  let fixture: ComponentFixture<RepoContributorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepoContributorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepoContributorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
