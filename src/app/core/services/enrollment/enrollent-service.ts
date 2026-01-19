import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IAPIRepsone } from '../../model/interfaces/Common.Model';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiMethodConstant, Controllers, METHOD_NAME } from '../../constant/Global.constant';

@Injectable({
  providedIn: 'root',
})
export class EnrollentService {
  http = inject(HttpClient);

  getAllEnrollments(): Observable<IAPIRepsone> {
    return this.http.get<IAPIRepsone>(environment.API_URL + Controllers.ENROLLMENTS +'/'+METHOD_NAME.ENROLMENT.GET_ALL_ENROLLMENT);
  }

  deleteEnrollment(enrollmentId: number): Observable<IAPIRepsone> {
    debugger;
    return this.http.delete<IAPIRepsone>(
      environment.API_URL + ApiMethodConstant.ENROLLMENTS + '/' + enrollmentId
    );
  }
  //https://feestracking.freeprojectapi.com/api/BatchEnrollments/by-candidate/103
  getEnrolledBatcheByCandidateId(ID: Number) {
    return this.http.get(environment.API_URL + Controllers.ENROLLMENTS + '/' +METHOD_NAME.ENROLMENT.GET_ENROLLMENT_BY_CANDIDATE+'/'+ID )
  }
}
