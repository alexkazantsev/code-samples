import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepoLanguageComponent } from './repo-language.component';

describe('RepoLanguageComponent', () => {
  let component: RepoLanguageComponent;
  let fixture: ComponentFixture<RepoLanguageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepoLanguageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepoLanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
