import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateSessionRecord } from './candidate-session-record';

describe('CandidateSessionRecord', () => {
  let component: CandidateSessionRecord;
  let fixture: ComponentFixture<CandidateSessionRecord>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidateSessionRecord]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidateSessionRecord);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
