import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BatchModel } from '../../core/model/classes/Batch.Model';
import { BatchService } from '../../core/services/batch/batch-service';
import { IAPIRepsone } from '../../core/model/interfaces/Common.Model';
import { DatePipe, NgClass } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-batch-master',
  imports: [FormsModule, NgClass, DatePipe],
  templateUrl: './batch-master.html',
  styleUrl: './batch-master.css',
})
export class BatchMaster implements OnInit, OnDestroy {

  newBatchObj: BatchModel = new BatchModel();
  batchSrv = inject(BatchService);
  batchList = signal<BatchModel[]>([]);
  isLoading = signal<boolean>(false);

  subscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.loadBatches();
    this.batchSrv.roleSub.subscribe((res) => {
      debugger;
    })
    this.batchSrv.roleBehvaiourSub.subscribe((res) => {
      debugger;
    })
  }

  /**
   * Load All Batches
   */
  loadBatches() {
    this.isLoading.set(true);
    this.subscription = this.batchSrv.getAllBatches().subscribe({
      next: (result: IAPIRepsone) => {
        this.isLoading.set(false);
        this.batchList.set(result.data);
      }
    })
  }

  /**
   * Edit Batch Api Call
   */
  editBatchApi() {
    this.batchSrv.editBatch(this.newBatchObj).subscribe({
      next: (result: IAPIRepsone) => {
        if (result.result) {
          this.onAddEditSuccess(result);
        } else {
          alert(result.message)
        }
      },
      error: (error) => {
        alert("Api Error " + error.error.message)
      }
    });
  }

  onAddEditSuccess(result: IAPIRepsone) {
    alert(result.message);
    this.loadBatches()
    this.newBatchObj = new BatchModel();
  }

  /**
   * Create Batch Api Call
   */
  callCreateBatchApi() {
    this.batchSrv.createNewBatch(this.newBatchObj).subscribe({
      next: (result: IAPIRepsone) => {
        if (result.result) {
          this.onAddEditSuccess(result);
        } else {
          alert(result.message)
        }
      },
      error: (error) => {
        alert("Api Error " + error.error.message)
      }
    });
  }

  /**
   * Call method when Save button clicked for create or edit batch
   * @returns 
   */
  onSaveBatch() {
    console.log('New Batch Obj ', this.newBatchObj);
    if (this.newBatchObj.batchId && this.newBatchObj.batchId > 0) {
      // Edit Batch Api Call
      this.editBatchApi();
      return;
    }

    this.callCreateBatchApi();
  }

  editBatch(item: BatchModel) {
    this.newBatchObj = { ...item };
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  /**
   * Call delete batch api
   * @param batchId 
   */
  deleteBatch(batchId: number) {
    this.batchSrv.deleteBatch(batchId).subscribe({
      next: (result: IAPIRepsone) => {
        if (result.result) {
          alert("Batch Deleted Succefully");
          this.loadBatches()
        } else {
          alert(result.message)
        }
      },
      error: (error) => {
        alert("Api Error " + error.error.message)
      }
    });
  }

}
