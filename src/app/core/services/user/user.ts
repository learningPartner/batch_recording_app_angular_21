import { Injectable } from '@angular/core';
import { CandidateModel } from '../../model/classes/Candidate.Model';
import { GlobalConstant } from '../../constant/Global.constant';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class User {

  loggedUserData: CandidateModel = new CandidateModel();

  loggedUserData$ : BehaviorSubject<CandidateModel> = new BehaviorSubject<CandidateModel>(this.loggedUserData)

  constructor() {
    
    const localData = localStorage.getItem(GlobalConstant.LOCAL_KEY_LOGIN);
    if (localData != null) {
      
      this.loggedUserData$.next(JSON.parse(localData));
    }
  }
}
