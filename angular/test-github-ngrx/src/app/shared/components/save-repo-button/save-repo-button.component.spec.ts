import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveRepoButtonComponent } from './save-repo-button.component';

describe('SaveRepoButtonComponent', () => {
  let component: SaveRepoButtonComponent;
  let fixture: ComponentFixture<SaveRepoButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveRepoButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveRepoButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
