import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionRecordings } from './session-recordings';

describe('SessionRecordings', () => {
  let component: SessionRecordings;
  let fixture: ComponentFixture<SessionRecordings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionRecordings]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionRecordings);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
