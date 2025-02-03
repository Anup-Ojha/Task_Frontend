import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalanderComponent } from './calendar.component';

describe('CalanderComponent', () => {
  let component: CalanderComponent;
  let fixture: ComponentFixture<CalanderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalanderComponent]
    });
    fixture = TestBed.createComponent(CalanderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
