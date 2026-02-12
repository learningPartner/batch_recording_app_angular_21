import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CandidateService } from '../../core/services/candidate/candidate-service';
import { IAPIRepsone } from '../../core/model/interfaces/Common.Model';
import { CandidateModel } from '../../core/model/classes/Candidate.Model';

@Component({
  selector: 'app-candidate-registration',
  imports: [ReactiveFormsModule],
  templateUrl: './candidate-registration.html',
  styleUrl: './candidate-registration.css',
})
export class CandidateRegistration {
  candidateForm: FormGroup = new FormGroup({
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    mobileNumber: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  isSubmitting = signal<boolean>(false);
  candidateSer = inject(CandidateService);
  router = inject(Router);

  onRegister() {
    if (this.candidateForm.invalid) {
      this.candidateForm.markAllAsTouched();
      return;
    }

    const formValue = this.candidateForm.value;
    const now = new Date().toISOString();

    const payload: CandidateModel = {
      candidateId: 0,
      fullName: formValue.fullName ?? '',
      email: formValue.email ?? '',
      mobileNumber: formValue.mobileNumber ?? '',
      password: formValue.password ?? '',
      role: 'Candidate',
      isActive: true,
      createdAt: now,
      updatedAt: now,
    };

    this.isSubmitting.set(true);
    this.candidateSer.createNewCandidate(payload).subscribe({
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
