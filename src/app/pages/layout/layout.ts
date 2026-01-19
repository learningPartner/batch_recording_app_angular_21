import { Component, inject } from '@angular/core';
import { Router, RouterOutlet, RouterLinkWithHref, RouterLink, RouterLinkActive } from '@angular/router';
import { GlobalConstant } from '../../core/constant/Global.constant';
import { BatchService } from '../../core/services/batch/batch-service';
import { Roles } from '../../core/enum/role.enum';
import { User } from '../../core/services/user/user';
import { CandidateModel } from '../../core/model/classes/Candidate.Model';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink,AsyncPipe,NgIf,RouterLinkActive], 
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
 
  router = inject(Router)
  batchSr  = inject(BatchService);
  roleEnum =  Roles;
  userSrv =  inject(User); 

  constructor() {  
    debugger;
  }

  onLogOff() {
    localStorage.removeItem(GlobalConstant.LOCAL_KEY_LOGIN);
    this.router.navigate(['login'])

  }

  onRoleChnages(event:any) {
    debugger;
    this.batchSr.roleSub.next(event.target.value);
    this.batchSr.roleBehvaiourSub.next(event.target.value);
  }
}
