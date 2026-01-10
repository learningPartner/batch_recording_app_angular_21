import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Enrollment } from './enrollment';

describe('Enrollment', () => {
  let component: Enrollment;
  let fixture: ComponentFixture<Enrollment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Enrollment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Enrollment);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
