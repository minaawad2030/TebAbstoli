import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalComponentComponent } from './final-component.component';

describe('FinalComponentComponent', () => {
  let component: FinalComponentComponent;
  let fixture: ComponentFixture<FinalComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinalComponentComponent]
    });
    fixture = TestBed.createComponent(FinalComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
