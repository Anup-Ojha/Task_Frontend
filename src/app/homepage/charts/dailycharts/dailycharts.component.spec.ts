import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailychartsComponent } from './dailycharts.component';

describe('DailychartsComponent', () => {
  let component: DailychartsComponent;
  let fixture: ComponentFixture<DailychartsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DailychartsComponent]
    });
    fixture = TestBed.createComponent(DailychartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
