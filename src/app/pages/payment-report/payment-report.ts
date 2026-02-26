import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BatchModel } from '../../core/model/classes/Batch.Model';
import { CandidateModel } from '../../core/model/classes/Candidate.Model';
import { IAPIRepsone } from '../../core/model/interfaces/Common.Model';
import { BatchService } from '../../core/services/batch/batch-service';
import { CandidateService } from '../../core/services/candidate/candidate-service';
import { PaymentService } from '../../core/services/payment';

interface PaymentSummary { 
  enrollmentId: number
  enrollmentDate: string
  batchId: number
  candidateId: number
  batchName: string
  candidateName: string
  mobileNumber: string
  email: string
  totalFees: number
  installment1: number
  installment2: number
  installment3: any
  installment4: any
  installment5: any
  totalReceived: number
  remainingFees: number
  totalInstallments: number 
}

@Component({
  selector: 'app-payment-report',
  imports: [ReactiveFormsModule, DatePipe, DecimalPipe],
  templateUrl: './payment-report.html',
  styleUrl: './payment-report.css',
})
export class PaymentReport implements OnInit, OnDestroy {
  paymentSrv = inject(PaymentService);
  batchSrv = inject(BatchService);
  candidateSrv = inject(CandidateService);

  filterForm: FormGroup = new FormGroup({});
  isLoading = signal<boolean>(false);
  paymentList = signal<PaymentSummary[]>([]);
  batchList = signal<BatchModel[]>([]);
  candidateList = signal<CandidateModel[]>([]);

  subscription: Subscription = new Subscription();

  constructor() {
    this.initializeFilterForm();
  }

  ngOnInit(): void {
    this.loadCandidates();
    this.loadBatches();
    this.loadPayments();
  }

  initializeFilterForm() {
    this.filterForm = new FormGroup({
      candidateId: new FormControl(0),
      batchId: new FormControl(0),
    });
  }

  loadCandidates() {
    this.subscription.add(
      this.candidateSrv.getAllCandidates().subscribe({
        next: (res: IAPIRepsone) => {
          this.candidateList.set((res.data ?? []) as CandidateModel[]);
        },
      })
    );
  }

  loadBatches() {
    this.subscription.add(
      this.batchSrv.getAllBatches().subscribe({
        next: (res: IAPIRepsone) => {
          this.batchList.set((res.data ?? []) as BatchModel[]);
        },
      })
    );
  }

  loadPayments(candidateId?: number, batchId?: number) {
    this.isLoading.set(true);
    this.subscription.add(
      this.paymentSrv.getEnrollmentPaymentSummary(candidateId, batchId).subscribe({
        next: (res: IAPIRepsone) => {
          this.isLoading.set(false);
          const paymentData = (res.data ?? []) as PaymentSummary[];
          this.paymentList.set(paymentData);
        },
        error: (error) => {
          this.isLoading.set(false);
          alert('Api Error ' + (error?.error?.message ?? 'Failed to load payment report'));
        },
      })
    );
  }

  onSearchFilters() {
    const candidateId = Number(this.filterForm.controls['candidateId'].value) || 0;
    const batchId = Number(this.filterForm.controls['batchId'].value) || 0;

    this.loadPayments(candidateId > 0 ? candidateId : undefined, batchId > 0 ? batchId : undefined);
  }

  onResetFilters() {
    this.filterForm.reset();
    this.filterForm.patchValue({
      candidateId: 0,
      batchId: 0,
    });
    this.loadPayments();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
