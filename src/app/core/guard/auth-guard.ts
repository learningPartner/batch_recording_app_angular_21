import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { GlobalConstant } from '../constant/Global.constant';
//upto angular 15 => service
//angualr 16 => arrwo fun 

export const authGuard: CanActivateFn = (route, state) => {
  debugger;
  const router = inject(Router);
  const localData = localStorage.getItem(GlobalConstant.LOCAL_KEY_LOGIN);
  if(localData != null) {
    return true;
  } else {
    router.navigateByUrl('/login')
    return false;
  }
};
