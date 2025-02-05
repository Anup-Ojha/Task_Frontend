import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgainzationComponent } from './orgainzation.component';

describe('OrgainzationComponent', () => {
  let component: OrgainzationComponent;
  let fixture: ComponentFixture<OrgainzationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrgainzationComponent]
    });
    fixture = TestBed.createComponent(OrgainzationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
