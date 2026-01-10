import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BatchModel } from '../../core/model/classes/Batch.Model';
import { BatchService } from '../../core/services/batch/batch-service';
import { IAPIRepsone } from '../../core/model/interfaces/Common.Model';
import { DatePipe, NgClass } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-batch-master',
  imports: [FormsModule,NgClass,DatePipe],
  templateUrl: './batch-master.html',
  styleUrl: './batch-master.css',
})
export class BatchMaster  implements OnInit, OnDestroy{

  newBatchObj: BatchModel = new BatchModel();
  batchSrv = inject(BatchService);
  batchList = signal<BatchModel[]>([]);

  subscription: Subscription = new Subscription();



  ngOnInit(): void {
    this.loadBatches();
    this.batchSrv.roleSub.subscribe((res)=>{
      debugger;
    })
    this.batchSrv.roleBehvaiourSub.subscribe((res)=>{
      debugger;
    })
  }

  loadBatches() {
    this.subscription = this.batchSrv.getAllBatches().subscribe({
      next:(result:IAPIRepsone)=>{
        this.batchList.set(result.data);
      }
    })
  }

  onSaveBatch() {
    debugger;
    this.batchSrv.createNewBatch(this.newBatchObj).subscribe({
      next: (result: IAPIRepsone) => {
        debugger;
        if (result.result) {
          alert("Batch Created Succefully");
          this.loadBatches()
        } else {
          alert(result.message)
        }
      },
      error: (error) => {
        alert("Api Error " + error.error.message)
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
