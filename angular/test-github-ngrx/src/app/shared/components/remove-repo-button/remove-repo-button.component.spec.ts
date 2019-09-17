import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveRepoButtonComponent } from './remove-repo-button.component';

describe('RemoveRepoButtonComponent', () => {
  let component: RemoveRepoButtonComponent;
  let fixture: ComponentFixture<RemoveRepoButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveRepoButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveRepoButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
