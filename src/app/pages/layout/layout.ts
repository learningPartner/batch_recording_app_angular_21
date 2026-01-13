import { Component, inject } from '@angular/core';
import { Router, RouterOutlet, RouterLinkWithHref, RouterLink, RouterLinkActive } from '@angular/router';
import { GlobalConstant } from '../../core/constant/Global.constant';
import { BatchService } from '../../core/services/batch/batch-service';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {

  loggedUserData: any;
  router = inject(Router)
  batchSr  = inject(BatchService)

  constructor() {
    const localData =  localStorage.getItem(GlobalConstant.LOCAL_KEY_LOGIN);
    if(localData != null) {
      this.loggedUserData =  JSON.parse(localData);
    }
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
