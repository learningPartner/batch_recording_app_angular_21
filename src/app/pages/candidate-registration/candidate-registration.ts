import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CandidateEnrollmentRequest, CandidateService } from '../../core/services/candidate/candidate-service';
import { IAPIRepsone } from '../../core/model/interfaces/Common.Model';
import { BatchService } from '../../core/services/batch/batch-service';
import { BatchModel } from '../../core/model/classes/Batch.Model';

@Component({
  selector: 'app-candidate-registration',
  imports: [ReactiveFormsModule],
  templateUrl: './candidate-registration.html',
  styleUrl: './candidate-registration.css',
})
export class CandidateRegistration {
  candidateForm: FormGroup = new FormGroup({
    batchId: new FormControl(0, [Validators.required, Validators.min(1)]),
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    mobileNumber: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  isSubmitting = signal<boolean>(false);
  isBatchLoading = signal<boolean>(false);
  batchList = signal<BatchModel[]>([]);
  candidateSer = inject(CandidateService);
  batchSrv = inject(BatchService);
  router = inject(Router);

  constructor() {
    this.getAllBatches();
  }

  getAllBatches() {
    this.isBatchLoading.set(true);
    this.batchSrv.getAllBatches().subscribe({
      next: (res: IAPIRepsone) => {
        this.isBatchLoading.set(false);
        this.batchList.set((res.data ?? []) as BatchModel[]);
      },
      error: () => {
        this.isBatchLoading.set(false);
        this.batchList.set([]);
      },
    });
  }

  onRegister() {
    if (this.candidateForm.invalid) {
      this.candidateForm.markAllAsTouched();
      return;
    }

    const formValue = this.candidateForm.getRawValue();
    const now = new Date().toISOString();

    const payload: CandidateEnrollmentRequest = {
      batchId: Number(formValue.batchId) || 0,
      candidate: {
        candidateId: 0,
        fullName: formValue.fullName ?? '',
        email: formValue.email ?? '',
        mobileNumber: formValue.mobileNumber ?? '',
        password: formValue.password ?? '',
        role: 'Candidate',
        isActive: true,
        createdAt: now,
        updatedAt: now,
      },
      enrollmentDate: now,
      isActive: true,
      totalFees: 0,
    };

    this.isSubmitting.set(true);
    this.candidateSer.createcandidateandenroll(payload).subscribe({
      next: (res: IAPIRepsone) => {
        this.isSubmitting.set(false);
        if (res.result) {
          alert(res.message);
          this.router.navigateByUrl('/login');
        } else {
          alert(res.message);
        }
      },
      error: (err) => {
        this.isSubmitting.set(false);
        alert(err?.error?.message ?? 'Registration failed');
      },
    });
  }

  goToLogin() {
    this.router.navigateByUrl('/login');
  }
}
