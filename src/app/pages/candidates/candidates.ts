import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CandidateService } from '../../core/services/candidate/candidate-service';
import { IAPIRepsone } from '../../core/model/interfaces/Common.Model';
import { CandidateModel } from '../../core/model/classes/Candidate.Model';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-candidates',
  imports: [ReactiveFormsModule, NgFor],
  templateUrl: './candidates.html',
  styleUrl: './candidates.css',
})
export class Candidates implements OnInit {

  candidateForm: FormGroup = new FormGroup({});
  candidateSer = inject(CandidateService);
  candidateList = signal<CandidateModel[]>([]);
  isLoading = signal<boolean>(false);

  constructor() {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.getCandidates();
  }

  /**
   * Get All Candidates
   */
  getCandidates() {
    this.isLoading.set(true);
    this.candidateSer.getAllCandidates().subscribe({
      next: (res: IAPIRepsone) => {
        this.isLoading.set(false);
        this.candidateList.set(res.data);
      }
    })
  }

  /**
   * Initialize Form
   */
  initializeForm() {
    this.candidateForm = new FormGroup({
      candidateId: new FormControl(0),
      fullName: new FormControl(''),
      email: new FormControl(''),
      mobileNumber: new FormControl(''),
      password: new FormControl(''),
      role: new FormControl(''),
      isActive: new FormControl(false),
      createdAt: new FormControl(new Date()),
      updatedAt: new FormControl(new Date()),
    })
  }

  /**
   * Reset Form when click on Reset Button
   */
  resetForm() {
    this.candidateForm.reset();
  }

  /**
   * Set form value when click on Edit Button
   * @param form 
   */
  onEdit(form: CandidateModel) {
    this.candidateForm.setValue(form)
  }

  /**
   * Call below method after Edit/Add Success
   * @param res 
   */
  onAddEditSuccess(res: IAPIRepsone) {
    alert(res.message);
    this.getCandidates()
    this.candidateForm.reset();
    this.candidateForm.patchValue({ candidateId: 0 });
  }

  /**
   * Call Api to Update Candidate and handle success response
   * @param formValue 
   */
  updateCandidate(formValue: CandidateModel) {
    this.candidateSer.updateCandidate(formValue).subscribe({
      next: (res: IAPIRepsone) => {
        if (res.result) {
          this.onAddEditSuccess(res);
        } else {
          alert(res.message)
        }
      }
    });
  }

  /**
   * Call Api to Create Candidate and handle success response
   * @param formValue 
   */
  createCandidate(formValue: CandidateModel) {
    this.candidateSer.createNewCandidate(formValue).subscribe({
      next: (res: IAPIRepsone) => {
        if (res.result) {
          this.onAddEditSuccess(res);
        } else {
          alert(res.message)
        }
      }
    })
  }

  /**
   * Save Candidate - Create or Update when click on Save/Update Button
   */
  onSaveCandidate() {
    const formValue = this.candidateForm.value;

    if (formValue.candidateId > 0) {
      this.updateCandidate(formValue);
    } else {
      formValue.candidateId = 0;
      this.createCandidate(formValue);
    }
  }

  /**
   *  Delete Candidate when click on Delete Button
   * @param candidateId 
   */
  onDelete(candidateId: number) {
    this.candidateSer.deleteCandidate(candidateId).subscribe({
      next: (res: IAPIRepsone) => {
        if (res.result) {
          alert("Candidate Deleted Succes");
          this.getCandidates();
        } else {
          alert(res.message)
        }
      }
    })
  }


}
