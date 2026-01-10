import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IAPIRepsone } from '../../model/interfaces/Common.Model';
import { CandidateModel } from '../../model/classes/Candidate.Model';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiMethodConstant } from '../../constant/Global.constant';

@Injectable({
  providedIn: 'root',
})
export class CandidateService {
  

  http =  inject(HttpClient); 


  createNewCandidate(obj: CandidateModel) : Observable<IAPIRepsone> {
     debugger;
    return this.http.post<IAPIRepsone>(environment.API_URL + ApiMethodConstant.CANDIDATES,obj)
  }

  getAllCandidates(): Observable<IAPIRepsone> {
    return this.http.get<IAPIRepsone>(environment.API_URL + ApiMethodConstant.CANDIDATES);
  }
}
