import { Component, inject, OnInit, signal } from '@angular/core';
import { GlobalConstant } from '../../core/constant/Global.constant';
import { EnrollentService } from '../../core/services/enrollment/enrollent-service';
import { BatchService } from '../../core/services/batch/batch-service';
import { RecordingService } from '../../core/services/recording/recording-service';
import { User } from '../../core/services/user/user';
import { CandidateModel } from '../../core/model/classes/Candidate.Model';

@Component({
  selector: 'app-candidate-session-record',
  imports: [],
  templateUrl: './candidate-session-record.html',
  styleUrl: './candidate-session-record.css',
})
export class CandidateSessionRecord implements OnInit{

  
  enrollSrv = inject(EnrollentService);
  batchSrv =  inject(RecordingService);
  userSrv =  inject(User);
  enrollments = signal< any[]>([])
  SessionRecordings = signal< any[]>([])

  constructor() {
    this.userSrv.loggedUserData$.subscribe((res:CandidateModel)=>{
      this.getBatchesByCandiate(res.candidateId)
    })
  }

  ngOnInit(): void {
    
  }

  getBatchesByCandiate(id: number) {
    // this.enrollSrv.getEnrolledBatcheByCandidateId(id).subscribe({
    //   next:(res:any)=>{
    //     this.enrollments.set(res.data);
    //   }
    // })
  }

  getSessionRecordings(bId: number) {
    this.batchSrv.getAllSessionRecordingByBatchId(bId).subscribe({
      next:(res:any)=>{
        this.SessionRecordings.set (res.data);
      }
    })
  }

}
