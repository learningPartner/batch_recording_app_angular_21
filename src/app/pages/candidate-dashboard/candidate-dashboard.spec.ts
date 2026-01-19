import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateDashboard } from './candidate-dashboard';

describe('CandidateDashboard', () => {
  let component: CandidateDashboard;
  let fixture: ComponentFixture<CandidateDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidateDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidateDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
