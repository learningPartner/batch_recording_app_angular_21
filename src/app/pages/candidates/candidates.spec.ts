import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Candidates } from './candidates';

describe('Candidates', () => {
  let component: Candidates;
  let fixture: ComponentFixture<Candidates>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Candidates]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Candidates);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
