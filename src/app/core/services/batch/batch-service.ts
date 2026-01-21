import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ApiMethodConstant } from '../../constant/Global.constant';
import { BatchModel } from '../../model/classes/Batch.Model';
import { BehaviorSubject, delay, Observable, Subject } from 'rxjs';
import { IAPIRepsone } from '../../model/interfaces/Common.Model';

@Injectable({
  providedIn: 'root',
})
export class BatchService {
  http = inject(HttpClient);

  roleSub = new Subject<string>();

  roleBehvaiourSub = new BehaviorSubject<string>("");

  createNewBatch(obj: BatchModel): Observable<IAPIRepsone> {
    return this.http.post<IAPIRepsone>(environment.API_URL + ApiMethodConstant.BATCH, obj)
  }

  getAllBatches(): Observable<IAPIRepsone> {
    return this.http.get<IAPIRepsone>(environment.API_URL + ApiMethodConstant.BATCH) 
  }

  editBatch(obj: BatchModel): Observable<IAPIRepsone> {
    const url = `${environment.API_URL}${ApiMethodConstant.BATCH}/${obj.batchId}`;
    return this.http.put<IAPIRepsone>(url, obj).pipe(
      delay(500)
    );
  }

 
  updateBatch(id: number, obj: BatchModel): Observable<IAPIRepsone> {
    return this.http.put<IAPIRepsone>(environment.API_URL + ApiMethodConstant.BATCH + '/' + id, obj);
  }
  
  deleteBatch(id: number): Observable<IAPIRepsone> {
    return this.http.delete<IAPIRepsone>(environment.API_URL + ApiMethodConstant.BATCH + '/' + id);
  }
}
