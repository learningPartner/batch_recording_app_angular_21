import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CandidateService } from '../../core/services/candidate/candidate-service';
import { IAPIRepsone } from '../../core/model/interfaces/Common.Model';
import { CandidateModel } from '../../core/model/classes/Candidate.Model';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-candidates',
  imports: [ReactiveFormsModule,NgFor],
  templateUrl: './candidates.html',
  styleUrl: './candidates.css',
})
export class Candidates implements OnInit {

  candidateForm: FormGroup = new FormGroup({});
  candidateSer = inject(CandidateService);
  candidateList = signal<CandidateModel []>([]);

  constructor() {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.getCandidates();
  }

  getCandidates() {
    this.candidateSer.getAllCandidates().subscribe({
      next:(res:IAPIRepsone)=>{
        this.candidateList.set(res.data);
      }
    })
  }

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

  onEdit(form: CandidateModel) {
    this.candidateForm.setValue(form)
  }

  onSaveCandidate() {
    debugger;
    const formValue =  this.candidateForm.value;
    this.candidateSer.createNewCandidate(formValue).subscribe({
      next:(res:IAPIRepsone)=>{
        if(res.result) {
          alert("Candidate Created Succes");
          this.getCandidates();
         // this.initializeForm();
          this.candidateForm.reset()
        } else {
          alert(res.message)
        }
      }
    })
  }


}
