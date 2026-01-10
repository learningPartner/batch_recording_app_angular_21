import { Component, inject } from '@angular/core';
import { BatchService } from '../../core/services/batch/batch-service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

  batchSrv = inject(BatchService);
  
  constructor() {
     this.batchSrv.roleSub.subscribe((res)=>{
      debugger;
    })
    this.batchSrv.roleBehvaiourSub.subscribe((res)=>{
      debugger;
    })
  }
}
