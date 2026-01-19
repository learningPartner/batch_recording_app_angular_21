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
  isEditMode = signal<boolean>(false);
  editingBatchId = signal<number | null>(null);

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
    if (this.isEditMode()) {
      this.batchSrv.updateBatch(this.editingBatchId()!, this.newBatchObj).subscribe({
        next: (result: IAPIRepsone) => {
          debugger;
          if (result.result) {
            alert("Batch Updated Successfully");
            this.resetForm();
            this.loadBatches();
          } else {
            alert(result.message);
          }
        },
        error: (error) => {
          alert("Api Error " + error.error.message);
        }
      });
    } else {
      this.batchSrv.createNewBatch(this.newBatchObj).subscribe({
        next: (result: IAPIRepsone) => {
          debugger;
          if (result.result) {
            alert("Batch Created Successfully");
            this.resetForm();
            this.loadBatches();
          } else {
            alert(result.message);
          }
        },
        error: (error) => {
          alert("Api Error " + error.error.message);
        }
      });
    }
  }

  onEditBatch(batch: BatchModel, id: number) {
    debugger;
    this.newBatchObj = { ...batch };
    this.isEditMode.set(true);
    this.editingBatchId.set(id);
    window.scrollTo(0, 0);
  }

  onDeleteBatch(id: number) {
    debugger;
    if (confirm("Are you sure you want to delete this batch?")) {
      this.batchSrv.deleteBatch(id).subscribe({
        next: (result: IAPIRepsone) => {
          debugger;
          if (result.result) {
            alert("Batch Deleted Successfully");
            this.loadBatches();
          } else {
            alert(result.message);
          }
        },
        error: (error) => {
          alert("Api Error " + error.error.message);
        }
      });
    }
  }

  resetForm() {
    this.newBatchObj = new BatchModel();
    this.isEditMode.set(false);
    this.editingBatchId.set(null);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
