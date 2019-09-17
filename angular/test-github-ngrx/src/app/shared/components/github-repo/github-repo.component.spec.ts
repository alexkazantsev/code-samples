import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubRepoComponent } from './github-repo.component';

describe('GithubRepoComponent', () => {
  let component: GithubRepoComponent;
  let fixture: ComponentFixture<GithubRepoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GithubRepoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GithubRepoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
