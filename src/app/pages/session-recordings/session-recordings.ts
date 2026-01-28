import { Component, inject, OnInit, signal } from '@angular/core';
import { ISession, ISessionRecording } from '../../core/model/interfaces/Session.Model';
import { form, minLength,Field, required } from '@angular/forms/signals';
import { map, Observable } from 'rxjs';
import { BatchModel } from '../../core/model/classes/Batch.Model';
import { BatchService } from '../../core/services/batch/batch-service';
import { IAPIRepsone } from '../../core/model/interfaces/Common.Model';
import { AsyncPipe, DatePipe } from '@angular/common';
import { RecordingService } from '../../core/services/recording/recording-service';

@Component({
  selector: 'app-session-recordings',
  imports: [Field,AsyncPipe,DatePipe],
  templateUrl: './session-recordings.html',
  styleUrl: './session-recordings.css',
})
export class SessionRecordings implements OnInit {

  newSession =  signal<ISession>({
    batchId: '0',
    createdAt: new Date(),
    displayOrder: 0,
    durationInMinutes: '',
    sessionDate: '',
    sessionId: 0,
    topicDescription: '',
    topicName: '',
    updatedAt: new Date(),
    youtubeVideoId: ''
  });

  batchList$: Observable<BatchModel[]>= new Observable<BatchModel[]>();
  batchService = inject(BatchService);
  recordingSrv = inject(RecordingService);
  records = signal<ISessionRecording[]>([])

  sessionForm  = form(this.newSession,(scehma)=>{
    required(scehma.topicName,{message:'Topic Name is Required'}),
    required(scehma.topicDescription),
    minLength(scehma.topicName, 4,{message:"Min 4 Chars Needed"})
  })
  
  constructor() {
    this.batchList$ = this.batchService.getAllBatches().pipe(
      map((res:IAPIRepsone)=> res.data)
    )
  }

  ngOnInit(): void {
    this.getAllSessionsRecording();
  }

  getAllSessionsRecording() {
    this.recordingSrv.getAllSessionRecording().subscribe({
      next:(res:any)=>{
        this.records.set(res.data)
      }
    })
  }

  onSaveSession() {
    const formValue =  this.sessionForm().value();
    
    this.recordingSrv.createNewSessionRecording(formValue).subscribe({
      next:(reS:any)=>{
        alert("Session Recoreding Created")
      }
    })
  }

}

 
