import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BatchService } from '../../core/services/batch/batch-service';
import { IAPIRepsone } from '../../core/model/interfaces/Common.Model';
import { BatchModel } from '../../core/model/classes/Batch.Model';
import { AsyncPipe, DatePipe } from '@angular/common';
import { interval, map, Observable, Subscription } from 'rxjs';
import { CandidateModel } from '../../core/model/classes/Candidate.Model';
import { CandidateService } from '../../core/services/candidate/candidate-service';
import { EnrollentService } from '../../core/services/enrollment/enrollent-service';

@Component({
  selector: 'app-enrollment',
  imports: [ReactiveFormsModule, AsyncPipe, DatePipe],
  templateUrl: './enrollment.html',
  styleUrl: './enrollment.css',
})
export class Enrollment implements OnInit, OnDestroy {


  enrollmentForm: FormGroup = new FormGroup({});

  foromBuilder = inject(FormBuilder);
  batchService = inject(BatchService);
  candidateSrv = inject(CandidateService);
  enrollmentSrv = inject(EnrollentService);

  batchData = signal<BatchModel[]>([]);

  enrollmentList = signal<any[]>([]);
  isLoading = signal<boolean>(false);

  candidateList$: Observable<CandidateModel[]> = new Observable<CandidateModel[]>;

  subscriptipon: Subscription = new Subscription();

  currentDate = signal<any>(new Date());

  timerInterval$ = interval(1000);

  //currenTime: Observable<any> = new Observable<any>;

  couter$ = interval(2000);

  //counterValue = signal<number>(0);

  constructor() {
    this.initiaizeForm();

    // this.couter$.subscribe(res=>{
    //   this.counterValue.set(res);
    // })
    this.timerInterval$.subscribe(res => {
      this.currentDate.set(new Date())
    })
    this.candidateList$ = this.candidateSrv.getAllCandidates().pipe(
      map((res: IAPIRepsone) => res.data)
    );
  }

  ngOnInit(): void {
    this.getAllBatches();
    this.getAllEnrollments();
  }

  initiaizeForm() {
    this.enrollmentForm = this.foromBuilder.group({
      enrollmentId: 0,
      batchId: 0,
      candidateId: 0,
      enrollmentDate: "",
      isActive: false
    })
  }

  getAllBatches() {
    this.batchService.getAllBatches().subscribe({
      next: (res: IAPIRepsone) => {
        this.batchData.set(res.data);
      }
    })
  }

  getAllEnrollments() {
    this.isLoading.set(true);
    this.subscriptipon = this.enrollmentSrv.getAllEnrollments().subscribe({
      next: (res: IAPIRepsone) => {
        this.isLoading.set(false);
        this.enrollmentList.set(res.data);
      }
    })
  }


  onSaveEnrollment() {
    const formValue = this.enrollmentForm.value;
    debugger;
  }

  ngOnDestroy(): void {
    this.subscriptipon.unsubscribe();
  }
}
