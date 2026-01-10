import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchMaster } from './batch-master';

describe('BatchMaster', () => {
  let component: BatchMaster;
  let fixture: ComponentFixture<BatchMaster>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BatchMaster]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatchMaster);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
