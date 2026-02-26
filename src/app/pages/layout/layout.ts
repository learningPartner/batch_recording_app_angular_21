import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet, RouterLinkWithHref, RouterLink } from '@angular/router';
import { GlobalConstant } from '../../core/constant/Global.constant';
import { BatchService } from '../../core/services/batch/batch-service';
import { Roles } from '../../core/enum/role.enum';
import { User } from '../../core/services/user/user';
import { CandidateModel } from '../../core/model/classes/Candidate.Model';
import { AsyncPipe, NgIf } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink,AsyncPipe,NgIf], 
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
 
  router = inject(Router)
  batchSr  = inject(BatchService);
  roleEnum =  Roles;
  userSrv =  inject(User); 
  isNavOpen = false;

  constructor() {  
    this.userSrv.readLoggedData();
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.isNavOpen = false;
      });
  }

  onSearch(event:any) {
    
    const searchjText =  event.target.value;
    this.userSrv.onSearchChange.next(searchjText)
  }

  onLogOff() {
    localStorage.removeItem(GlobalConstant.LOCAL_KEY_LOGIN);
    this.router.navigate(['login']) 
  }

  onRoleChnages(event:any) {
    
    this.batchSr.roleSub.next(event.target.value);
    this.batchSr.roleBehvaiourSub.next(event.target.value);
  }

  toggleNav() {
    this.isNavOpen = !this.isNavOpen;
  }
}
