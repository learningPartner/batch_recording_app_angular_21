import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Controllers, METHOD_NAME } from '../../constant/Global.constant';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  

  http = inject(HttpClient);

  getAdminDashboard() {
    return this.http.get(environment.API_URL + Controllers.DASHBOARD + METHOD_NAME.DASHBOARD.GET_ADMIN_DASHBOARD)
  }

    getBatchWiseCandidates() {
    return this.http.get(environment.API_URL + Controllers.DASHBOARD + METHOD_NAME.DASHBOARD.BATCH_CANDIDATES)
  }

   getCandidateDash(candidateId: number) {
    return this.http.get(environment.API_URL + Controllers.DASHBOARD + METHOD_NAME.DASHBOARD.GET_CANDIDATE_DASHBOADD +candidateId )
  }

   getCandidateBtachRecording(candidateId: number) {
    return this.http.get(environment.API_URL + Controllers.DASHBOARD + METHOD_NAME.DASHBOARD.GET_CANDIDATE_BATCH_RECORDING_ +candidateId )
  }


}
