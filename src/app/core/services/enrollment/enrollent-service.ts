import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ApiMethodConstant } from '../../constant/Global.constant';
import { BatchModel } from '../../model/classes/Batch.Model';
import { BehaviorSubject, delay, Observable, Subject } from 'rxjs';
import { IAPIRepsone } from '../../model/interfaces/Common.Model';

@Injectable({
  providedIn: 'root',
})
export class EnrollentService {

  http = inject(HttpClient);

  constructor() {}

  getAllEnrollments(): Observable<IAPIRepsone> {
    return this.http.get<IAPIRepsone>(environment.API_URL + ApiMethodConstant.ENROLLMENTS+'/GetAllEnrollment').pipe(
      delay(300)
    );
  }

  deleteEnrollment(enrollmentId: number): Observable<IAPIRepsone> { 
    const url = `${environment.API_URL}${ApiMethodConstant.ENROLLMENTS}/${enrollmentId}`;
    return this.http.delete<IAPIRepsone>(url).pipe(
      delay(500)
    );
  }

}
